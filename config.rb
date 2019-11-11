# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

require 'yaml'

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

activate :i18n, :path => "/:locale/", :mount_at_root => false, :langs => [:fr, :en]

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

["other", "t_bien_roule", "queen", "jeans"].each do |name|
  proxy "fr/galery_#{name}.html", "localizable/galery.fr.html", :locals => { :galery_name => name }, locale: :fr
  proxy "en/galery_#{name}.html", "localizable/galery.en.html", :locals => { :galery_name => name }, locale: :en
end


# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

helpers do
  def get_images_in_galery(name)
    Dir.entries("source/images/galery/" + name + "/thumb/").select{|e| /.jpe?g/.match(e)}
  end

  def breadcrumb(level1, level2=nil)
    content_tag("div", id: "breadcrumb") do
      t = '<a href="index.html"><i class="fa fa-home" aria-hidden="true"></i></a>'
      t += '<i class="fa fa-chevron-right" aria-hidden="true"></i>'
      t+= level1

      if level2
        t += '<i class="fa fa-chevron-right" aria-hidden="true"></i>'
        t+= level2
      end

      t
    end
  end

  def get_figcaption(galery_name, name_photo)
    name_photo.gsub!(".jpeg", "")
    name_photo.gsub!(".jpg", "")

    path = "source/images/galery/" + galery_name + "/full/" + name_photo + ".txt"

    if File.exists?(path)
      t = ""
      meta = YAML.load(File.read(path))

      t += "<h3>#{meta["name"]}</h3>" if meta["name"].present?
      t += "<i>Model : </i> #{display_users(meta["modele"])} <br/>"  if meta["modele"].present?
      t += "<i>Photographer : </i> #{display_users(meta["photographer"])}<br/>" if meta["photographer"].present?
    end
  end

  def display_users(users)
    path = "source/images/users/#{users}.txt"

    if File.exists?(path)
      meta_user = YAML.load(File.read(path))

      t = ""
      if meta_user["name"]
        if meta_user["link"]
          t += "<a href='#{ meta_user["link"]}' target='_blank'>#{meta_user["name"]} <i class='fa fa-link' aria-hidden='true'></i></a>"
        else
          t += meta_user["name"]
        end
      end

      t
    else
      users
    end
  end

end

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

 configure :build do

   activate :minify_css
   #activate :minify_javascript
 end
