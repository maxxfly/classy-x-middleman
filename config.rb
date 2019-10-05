# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

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
end

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

 configure :build do

#   activate :minify_css
#   activate :minify_javascript
 end
