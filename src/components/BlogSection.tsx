import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blog";

const BlogSection = () => {
  const previewPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="py-24 bg-muted">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-secondary font-semibold mb-2">From Our Blog</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Stories from the field
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Read about our latest programs, impact stories, and how we’re supporting youth and caregivers in Nairobi.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {previewPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
            >
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground text-xs mb-2">{post.date}</p>
                <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`}>
                  <Button className="bg-secondary text-secondary-foreground hover:bg-orange-glow font-semibold px-6 rounded-full">
                    Read More
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/blog">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 rounded-full">
              View All Posts
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
