.PHONY: install build dev

install:
	bundle config set --local path '.bundle'
	bundle install

build:
	bundle exec middleman build

dev:
	bundle exec middleman server
