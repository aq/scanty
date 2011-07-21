xml.instruct!
xml.urlset "xmlns" => "http://www.sitemaps.org/schemas/sitemap/0.9" do
	xml.url do
		xml.loc Blog.url_base
	end
  @posts.each do |post|
    xml.url do
      xml.loc 		post.full_url
      xml.lastmod post[:created_at].iso8601 
    end
  end
end
