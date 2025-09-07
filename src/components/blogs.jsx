import React, { useState, useEffect } from "react";
import "./blogs.css";
import Footer from '../components/footer';
import BlogCarousel from './blogscarousel';
import { ChevronDown } from "lucide-react";

const initialBlogs = [
  {
    id: "blog1",
    title: "Top Hearing Aids in 2025",
    content: "A roundup of the latest and most effective hearing aids this year.",
    image: require("./assets/blog1.jpg"),
    category: "Technology",
    author: "Dr. Sarah Chen",
    publishDate: "January 15, 2025",
    readTime: "5 min read",
    fullContent: {
      title: "Top Hearing Aids in 2025",
      sections: [
        {
          heading: "📰 Introduction",
          content: "Congratulations on taking this first step toward better hearing health! If you're a little nervous about your upcoming appointment with your hearing care professional, there's no need. These visits are easy, quick, and painless - and can completely change your life."
        },
        {
          heading: "✅ What to Expect During Your Visit",
          content: "Get to know your hearing care provider. Expect to spend a little time just chatting with your hearing care professional (HCP) or audiologist about your health, lifestyle, and any symptoms you might be experiencing. It's very helpful to bring someone with you who can also talk about your potential hearing loss, as well as help you remember any details from your visit. If you have any questions for your HCP, write them down ahead of time to help you remember to ask them during your visit.",
          bulletPoints: [
            "Comprehensive hearing assessment and evaluation",
            "Discussion of your lifestyle and hearing needs",
            "Review of the latest hearing aid technologies",
            "Personalized recommendations based on your hearing profile",
            "Fitting and adjustment of selected devices"
          ]
        },
        {
          heading: "🔊 Top Hearing Aid Features in 2025",
          bulletPoints: [
            "Advanced AI-powered noise reduction technology",
            "Bluetooth connectivity for seamless device integration",
            "Rechargeable batteries with 24+ hour life",
            "Smartphone app control and customization",
            "Tinnitus masking and relief features",
            "Water-resistant and durable designs",
            "Real-time language translation capabilities"
          ]
        },
        {
          heading: "💬 Choosing the Right Hearing Aid",
          content: "The best hearing aid for you depends on several factors including your degree of hearing loss, lifestyle preferences, and budget considerations. Modern hearing aids are virtually invisible and offer exceptional sound quality that adapts to your environment automatically.",
          bulletPoints: [
            "Behind-the-ear (BTE) models for severe hearing loss",
            "In-the-ear (ITE) options for moderate hearing loss",
            "Completely-in-canal (CIC) for discretion",
            "Receiver-in-canal (RIC) for natural sound quality"
          ]
        }
      ]
    }
  },
  {
    id: "blog2",
    title: "Choosing the Right Hearing Aid",
    content: "What to consider when selecting your first hearing device.",
    image: require("./assets/blog2.avif"),
    category: "Advice",
    author: "Michael Rodriguez",
    publishDate: "December 8, 2024",
    readTime: "7 min read",
    fullContent: {
      title: "Choosing the Right Hearing Aid",
      sections: [
        {
          heading: "Introduction",
          content: "Selecting the right hearing aid is a crucial decision that can significantly impact your quality of life. With so many options available today, finding the perfect match for your specific needs requires careful consideration of several factors. This guide will help you navigate the process of choosing a hearing aid that best suits your hearing loss, lifestyle, and personal preferences."
        },
        {
          heading: "🔎 Understanding Your Hearing Loss",
          content: "The first step in choosing the right hearing aid is understanding the type and severity of your hearing loss. A professional evaluation by an audiologist will determine your specific hearing profile through comprehensive testing. Different hearing aids are designed to address different types of hearing loss – from mild to profound, and from high-frequency to full-spectrum loss. Your audiologist will explain your audiogram results and recommend appropriate technology based on your unique hearing needs."
        },
        {
          heading: "🌐 Matching Your Lifestyle",
          content: "Your daily activities and environments play a crucial role in determining the best hearing aid for you. Consider where you spend most of your time and what listening situations are most important to you. If you lead an active lifestyle with varied environments (restaurants, outdoor activities, meetings), you might benefit from advanced devices with automatic setting adjustments and directional microphones. For quieter lifestyles with more one-on-one conversations, simpler devices might suffice. Be honest with your audiologist about your typical day to ensure your hearing aids enhance the moments that matter most."
        },
        {
          heading: "🎧 Comfort & Style",
          content: "Hearing aids come in various styles, from nearly invisible in-the-canal models to behind-the-ear options. Your choice depends on factors like dexterity (how easily you can handle small devices), the severity of hearing loss, cosmetic preferences, and comfort. Behind-the-ear (BTE) aids are larger but powerful and easier to handle. In-the-ear (ITE) aids are custom-fitted to your ear canal and less visible. Completely-in-canal (CIC) aids are nearly invisible but may have fewer features and shorter battery life. Your comfort is paramount – a hearing aid you don't wear because it's uncomfortable won't help your hearing! "
        },
        {
          heading: "📱 Smart Features & Connectivity",
          content: "Modern hearing aids offer impressive technological features that can enhance your listening experience. Bluetooth connectivity allows direct streaming from smartphones, TVs, and other devices. Smartphone apps let you adjust settings discreetly without touching your hearing aids. Rechargeable batteries eliminate the need for frequent battery changes. Telecoil functionality helps in venues with loop systems. Noise reduction and speech enhancement features improve clarity in challenging environments. Consider which features would most benefit your specific needs and lifestyle."
        },
        {
          heading: "💰 Cost & Coverage",
          content: "Hearing aids typically range from $1,000 to $4,000+ per ear, depending on technology level and features. While premium models offer advanced features, mid-range options provide excellent performance for many users. Check your insurance coverage, as some plans provide partial or full coverage for hearing aids. Veterans may qualify for free hearing aids through the VA. Some manufacturers offer financing options, and nonprofit organizations provide assistance programs. Remember that investing in better hearing is investing in your overall health, cognitive function, and quality of life."
        },
        {
          heading: "📝 Pro Tip",
          content: "Always ask about trial periods (typically 30-60 days) before making your final decision. This allows you to test the hearing aids in your daily environments. Professional fitting and follow-up adjustments are essential for optimal performance – even the most advanced hearing aid won't work well if not properly fitted to your specific hearing needs. Don't hesitate to schedule follow-up appointments for fine-tuning as you adapt to your new hearing aids."
        }
      ]
    }
  },
  {
    id: "blog3",
    title: "Revolutionizing Hearing",
    content: "Artificial intelligence and sound processing innovations.",
    image: require("./assets/blog3.jpeg"),
    category: "Technology",
    author: "Dr. Emily Watson",
    publishDate: "November 22, 2024",
    readTime: "6 min read",
    fullContent: {
      title: "Revolutionizing Hearing",
      sections: [
        {
          heading: "Introduction",
          content: "The hearing aid industry has undergone a remarkable transformation in recent years, shifting from simple passive amplification devices to sophisticated, intelligent auditory systems. Artificial intelligence is at the forefront of this revolution, fundamentally changing how hearing aids function and interact with users. Today's AI-powered hearing aids don't just make sounds louder—they understand context, learn preferences, and deliver personalized hearing experiences that were unimaginable just a decade ago."
        },
        {
          heading: "🎯 Precision Listening in Any Environment",
          content: "Modern AI-powered hearing aids are equipped with advanced scene analysis capabilities that can identify and adapt to virtually any acoustic environment. These intelligent devices learn your habits and preferences over time, optimizing volume levels, noise reduction, and speech clarity based on your specific needs in various settings. Whether you're in a crowded restaurant, watching television, or enjoying a quiet conversation at home, AI algorithms continuously analyze incoming sounds and make micro-adjustments to provide the clearest, most natural listening experience possible. Some premium models can even recognize specific voices and prioritize them over background noise, ensuring you never miss important conversations with family and friends."
        },
        {
          heading: "🔁 Real-Time Learning",
          content: "The most impressive aspect of AI hearing technology is its ability to learn and improve over time. Using deep learning algorithms similar to those powering facial recognition and voice assistants, modern hearing aids analyze your surroundings and adjust settings automatically. When you manually adjust your hearing aid settings in specific environments, the AI remembers these preferences and applies them automatically the next time you're in a similar situation. This continuous learning process means your hearing aids become increasingly personalized, requiring fewer manual adjustments as they learn your preferences. Some advanced models can even communicate with other users' devices anonymously, leveraging collective intelligence to improve performance across challenging listening environments."
        },
        {
          heading: "🧠 Embedded Health Intelligence",
          content: "AI-powered hearing aids are evolving beyond just hearing enhancement to become comprehensive health monitoring devices. Many newer models now include embedded sensors that can track physical activity like steps taken, detect falls and send alerts to emergency contacts, and even monitor vital signs like heart rate. Research has established strong connections between hearing health and cognitive function, and some AI hearing aids now track usage patterns that may provide early warnings for cognitive decline. By combining hearing assistance with health monitoring, these devices offer a holistic approach to wellness that's particularly valuable for older adults. The data collected can be shared with healthcare providers through secure apps, allowing for more comprehensive health management."
        },
        {
          heading: "🗣️ Assistive Tools",
          content: "Premium AI hearing aids now offer an impressive array of assistive features that extend their functionality far beyond traditional hearing enhancement. Live captioning capabilities can transcribe conversations in real-time, displaying text on your smartphone to ensure you never miss a word. Multi-language translation features allow wearers to understand foreign languages through real-time audio translation directly into their hearing aids. Voice-to-text transcription services can record and save important conversations for later reference. Many devices also integrate seamlessly with popular AI assistants like Siri, Alexa, and Google Assistant, allowing users to control smart home devices, set reminders, or access information through voice commands directly through their hearing aids. These features transform hearing aids from medical devices into essential lifestyle technology."
        }
      ]
    }
  },
  {
    id: "blog4",
    title: "Success Story: Sarah's Journey",
    content: "How a hearing aid gave back her confidence.",
    image: require("./assets/blog4.jpg"),
    category: "Stories",
    author: "Sarah Thompson",
    publishDate: "October 15, 2024",
    readTime: "8 min read",
    fullContent: {
      title: "Success Story: Sarah's Journey",
      sections: [
        {
          heading: "Introduction",
          content: "At 42, Sarah Thompson was at the peak of her career as a high school English teacher when she began to notice something wasn't quite right. The vibrant classroom discussions she once effortlessly led were becoming increasingly difficult to follow. This is the story of how Sarah rediscovered life through sound, transforming from someone struggling with hearing loss to becoming an advocate for early hearing intervention."
        },
        {
          heading: "The Silent Struggle",
          content: "'I started positioning myself at the front of gatherings, asking people to repeat themselves, and even reading lips without realizing it,' Sarah recalls. In her classroom, she began to miss students' questions from the back rows and found herself exhausted from straining to hear throughout the day. The turning point came when a student kindly suggested she might not be hearing everything that was being said during class discussions."
        },
        {
          heading: "Taking the First Step",
          content: "After months of hesitation, Sarah finally scheduled an appointment with a hearing care professional. 'I was worried about wearing a visible hearing aid at 42. I thought it would make me seem old or somehow less capable in front of my students,' she admits. Her audiologist listened to her concerns and recommended a nearly invisible in-canal device powered by the latest AI technology. The hearing aid was custom-fitted to her ear canal and programmed specifically for her unique hearing profile, with special attention to the frequencies most important for speech comprehension."
        },
        {
          heading: "A Moment of Clarity",
          content: "'The first time I heard my students laugh clearly again... I cried,' Sarah shares, her eyes brightening at the memory. 'I hadn't realized how much I was missing until suddenly everything was crystal clear again.' The advanced features of her hearing aids, including background noise suppression and real-time clarity boost for speech, allowed her to engage fully in classroom discussions once more. Within weeks, colleagues noticed her renewed energy and confidence in faculty meetings."
        },
        {
          heading: "Beyond the Classroom",
          content: "The benefits extended far beyond Sarah's professional life. She rediscovered the joy of attending concerts, having dinner in busy restaurants, and participating in family gatherings without the anxiety of missing parts of conversations. 'My hearing aids have become such an essential part of my daily routine that I sometimes forget I'm wearing them,' she explains. The rechargeable devices last all day on a single charge, and Sarah particularly appreciates the smartphone app that allows her to discreetly adjust settings for different environments."
        },
        {
          heading: "Becoming an Advocate",
          content: "Today, Sarah has become an advocate for early hearing care intervention, particularly among working professionals who might delay seeking help due to stigma or misconceptions about hearing aids. She regularly speaks at teacher conferences about the importance of addressing hearing health and how modern technology has eliminated many of the traditional barriers. 'I tell everyone that getting hearing aids wasn't about accepting limitation—it was about embracing possibility,' she says."
        },
        {
          heading: "📣 Sarah's Takeaway",
          content: "\"Don't wait. Hearing better isn't about age—it's about living fully. Modern hearing aids are nothing like what people imagine. They're sophisticated, nearly invisible devices that connect to your smartphone and adapt to your environment. The technology is incredible, but the real magic is in rediscovering all the sounds that make life rich and meaningful.\""
        }
      ]
    }
  },
  {
    id: "blog5",
    title: "Overcoming Hearing Stigma",
    content: "Changing perceptions about hearing loss.",
    image: require("./assets/blog5.jpg"),
    category: "Advice",
    author: "Dr. James Wilson",
    publishDate: "September 30, 2024",
    readTime: "5 min read",
    fullContent: {
      title: "Overcoming Hearing Stigma",
      sections: [
        {
          heading: "Introduction",
          content: "The perception of hearing aids has undergone a remarkable transformation in recent years. Once viewed as cumbersome devices associated exclusively with aging, today's hearing technology is increasingly celebrated as innovative wearable tech that enhances life quality for people of all ages. This shift represents a broader cultural movement away from stigmatizing hearing loss toward embracing hearing health as an essential component of overall wellness. As technology advances and awareness grows, the outdated stereotypes surrounding hearing aids are rapidly disappearing."
        },
        {
          heading: "💼 Tech for All Ages",
          content: "One of the most significant changes in hearing technology adoption is the expanding demographic of users. No longer exclusively associated with older adults, hearing enhancement devices are increasingly popular among millennials and Gen Z professionals seeking to optimize their sensory experiences. Many younger adults are proactively addressing mild hearing challenges or using specialized hearing technology to enhance focus in noisy work environments, filter unwanted sounds, or boost productivity. This shift mirrors the wellness tech movement, where hearing devices are viewed alongside fitness trackers and smart glasses as tools for optimizing human performance rather than merely compensating for impairment."
        },
        {
          heading: "🎧 Designer Devices",
          content: "Modern hearing aids bear little resemblance to the bulky, beige devices of decades past. Today's hearing technology is sleek, minimalist, and often indistinguishable from popular wireless earbuds. Leading manufacturers now offer devices in various colors, metallic finishes, and even collaborations with fashion designers to create hearing aids that function as stylish accessories. Many users can control their hearing aids through smartphone apps, adjusting settings for different environments with a discreet tap on their phone. The miniaturization of components has resulted in devices so tiny they sit completely within the ear canal, invisible to others, while delivering exceptional sound quality and smart features that rival premium consumer audio products."
        },
        {
          heading: "🌍 Awareness Movements",
          content: "Social media has played a pivotal role in normalizing conversations about hearing health. Influencers and celebrities are increasingly open about their hearing experiences, sharing their journeys with millions of followers. Hashtags like #HearingHealthAwareness and #BreakTheStigma have created communities where people celebrate their hearing technology rather than concealing it. Public awareness campaigns featuring respected athletes, musicians, and actors who use hearing aids have helped reframe the narrative around hearing loss. These movements emphasize that addressing hearing needs is a sign of self-awareness and proactive health management—similar to wearing glasses for vision correction or using fitness technology to monitor physical health."
        },
        {
          heading: "🧠 Mental Wellness Connection",
          content: "Research has established clear links between untreated hearing loss and mental health challenges, including increased risk of social isolation, anxiety, depression, and cognitive decline. As mental health awareness grows, more people recognize the importance of addressing hearing concerns as part of their overall wellness strategy. Hearing healthcare professionals now often collaborate with mental health providers to address the psychological aspects of hearing loss and adaptation to hearing technology. Users frequently report significant improvements in mental well-being after addressing hearing loss, including reduced stress in social situations, improved relationships, and renewed confidence in professional settings. This growing understanding of the hearing-brain connection has helped reframe hearing aids as essential tools for maintaining cognitive health and emotional well-being."
        },
        {
          heading: "🎙️ Celebration Message",
          content: "The most powerful force breaking down hearing stigma is the growing community of confident hearing aid users who openly celebrate their technology. Rather than viewing hearing aids as something to hide, many users now approach them with the same attitude as they would stylish eyeglasses or the latest smartphone—as modern tools that enhance daily life and reflect personal style. Hearing aids are increasingly recognized as sophisticated wearable technology that represents taking control of one's health and embracing innovation. The message emerging from hearing health advocates is clear: using hearing technology isn't about admitting defeat—it's about making a bold, empowered choice to live life to its fullest potential with all senses engaged."
        }
      ]
    }
  },
  {
        id: "blog6",
    title: "Overcoming Hearing Stigma",
    content: "Changing perceptions about hearing loss.",
    image: require("./assets/blog6.webp"),
    category: "Stories",
    author: "Dr. James Wilson",
    publishDate: "September 30, 2024",
    readTime: "5 min read",
    fullContent: {
      title: "Overcoming Hearing Stigma",
      sections: [
        {
          heading: "Introduction",
          content: "The perception of hearing aids has undergone a remarkable transformation in recent years. Once viewed as cumbersome devices associated exclusively with aging, today's hearing technology is increasingly celebrated as innovative wearable tech that enhances life quality for people of all ages. This shift represents a broader cultural movement away from stigmatizing hearing loss toward embracing hearing health as an essential component of overall wellness. As technology advances and awareness grows, the outdated stereotypes surrounding hearing aids are rapidly disappearing."
        },
        {
          heading: "💼 Tech for All Ages",
          content: "One of the most significant changes in hearing technology adoption is the expanding demographic of users. No longer exclusively associated with older adults, hearing enhancement devices are increasingly popular among millennials and Gen Z professionals seeking to optimize their sensory experiences. Many younger adults are proactively addressing mild hearing challenges or using specialized hearing technology to enhance focus in noisy work environments, filter unwanted sounds, or boost productivity. This shift mirrors the wellness tech movement, where hearing devices are viewed alongside fitness trackers and smart glasses as tools for optimizing human performance rather than merely compensating for impairment."
        },
        {
          heading: "🎧 Designer Devices",
          content: "Modern hearing aids bear little resemblance to the bulky, beige devices of decades past. Today's hearing technology is sleek, minimalist, and often indistinguishable from popular wireless earbuds. Leading manufacturers now offer devices in various colors, metallic finishes, and even collaborations with fashion designers to create hearing aids that function as stylish accessories. Many users can control their hearing aids through smartphone apps, adjusting settings for different environments with a discreet tap on their phone. The miniaturization of components has resulted in devices so tiny they sit completely within the ear canal, invisible to others, while delivering exceptional sound quality and smart features that rival premium consumer audio products."
        },
        {
          heading: "🌍 Awareness Movements",
          content: "Social media has played a pivotal role in normalizing conversations about hearing health. Influencers and celebrities are increasingly open about their hearing experiences, sharing their journeys with millions of followers. Hashtags like #HearingHealthAwareness and #BreakTheStigma have created communities where people celebrate their hearing technology rather than concealing it. Public awareness campaigns featuring respected athletes, musicians, and actors who use hearing aids have helped reframe the narrative around hearing loss. These movements emphasize that addressing hearing needs is a sign of self-awareness and proactive health management—similar to wearing glasses for vision correction or using fitness technology to monitor physical health."
        },
        {
          heading: "🧠 Mental Wellness Connection",
          content: "Research has established clear links between untreated hearing loss and mental health challenges, including increased risk of social isolation, anxiety, depression, and cognitive decline. As mental health awareness grows, more people recognize the importance of addressing hearing concerns as part of their overall wellness strategy. Hearing healthcare professionals now often collaborate with mental health providers to address the psychological aspects of hearing loss and adaptation to hearing technology. Users frequently report significant improvements in mental well-being after addressing hearing loss, including reduced stress in social situations, improved relationships, and renewed confidence in professional settings. This growing understanding of the hearing-brain connection has helped reframe hearing aids as essential tools for maintaining cognitive health and emotional well-being."
        },
        {
          heading: "🎙️ Celebration Message",
          content: "The most powerful force breaking down hearing stigma is the growing community of confident hearing aid users who openly celebrate their technology. Rather than viewing hearing aids as something to hide, many users now approach them with the same attitude as they would stylish eyeglasses or the latest smartphone—as modern tools that enhance daily life and reflect personal style. Hearing aids are increasingly recognized as sophisticated wearable technology that represents taking control of one's health and embracing innovation. The message emerging from hearing health advocates is clear: using hearing technology isn't about admitting defeat—it's about making a bold, empowered choice to live life to its fullest potential with all senses engaged."
        }
      ]
    }
  },
  
];

const BlogPage = () => {
    const [likedBlogs, setLikedBlogs] = useState({}); // <- add this
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleReadMore = (blog) => {
    setSelectedBlog(blog);
  };

  const handleBackToBlogs = () => {
    setSelectedBlog(null);
  };

  const handleLike = (blogId) => {
    setLikedBlogs(prev => ({
      ...prev,
      [blogId]: !prev[blogId]
    }));
  };

  const filtered = initialBlogs.filter(
    (b) =>
      (category === "All" || b.category === category) &&
      b.title.toLowerCase().includes(search.toLowerCase())
  );

  const categories = ["All", "Technology", "Advice", "Stories"];

  if (selectedBlog) {
    return (
      <div className="blog-container">
        <div className="article-detail">
          <button className="common-btn" onClick={handleBackToBlogs}>
            ← Back to Blogs
          </button>

          <div className="article-header">
            <img src={selectedBlog.image} alt={selectedBlog.title} className="article-hero-image" />
            <div className="article-title-section">
              <h1 className="article-title">{selectedBlog.fullContent?.title || selectedBlog.title}</h1>
            </div>
          </div>

          <div className="article-layout">
            <div className="article-content">
              {selectedBlog.fullContent?.sections.map((section, index) => (
                <div key={index} className="article-section">
                  <h2 className="section-heading">{section.heading}</h2>
                  {section.content && (
                    <p className="section-content">{section.content}</p>
                  )}
                  {section.bulletPoints && (
                    <ul className="bullet-list">
                      {section.bulletPoints.map((point, pointIndex) => (
                        <li key={pointIndex} className="bullet-item">{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="article-sidebar">
              <div className="signup-form">
                <h3>Sign up for the latest updates</h3>
                <form>
                  <input type="text" placeholder="First Name*" className="form-input" />
                  <input type="text" placeholder="Last Name*" className="form-input" />
                  <input type="email" placeholder="Email Address*" className="form-input" />
                  <button type="submit" className="signup-btn">Sign up</button>
                </form>
              </div>

              <div className="related-posts">
                <h3>RELATED POSTS</h3>
                <div className="related-post-item">
                  <img src="https://placehold.co/150x100/90c695/ffffff?text=Hearing+Care+Tips" alt="Related post" />
                  <p>Tips for Better Hearing Health</p>
                </div>
              </div>
            </div>
          </div>
          <Footer isArticlePage={true} />
        </div>
      </div>
    );
  }

  return (
        <>

    <div className="blog-container">
      {/* Main Heading */}
      <h1 className="main-heading">Trending Blogs</h1>

      {/* Featured Articles Carousel */}
      <BlogCarousel />

{/* Search and Filter Controls */}
<div className="top-controls">
  {/* Search Input */}
  <input
    type="text"
    className="search-input"
    placeholder="Search blogs..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  {/* Dropdown with custom chevron */}
  <div className="dropdown-wrapper">
    <select
      className="filter-dropdown"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      {categories.map((c, i) => (
        <option key={i} value={c}>
          {c}
        </option>
      ))}
    </select>
    <ChevronDown size={20} className="dropdown-chevron" />
  </div>
</div>
{/* Removed the category filter bar for ALL ARTICLES, CATEGORY 1, CATEGORY 2, CATEGORY 3 */}

      {/* Blog Grid */}
      <div className="blog-grid">
        {filtered.map((blog) => (
          <div className="blog-card" key={blog.id}>
            <img src={blog.image} alt={blog.title} />
              <div className="blog-content">
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                
                
                <div className="button-container">
                  <div className="read-more-btn-container">
                    <button 
                      className="common-btn"
                      onClick={() => handleReadMore(blog)}
                    >
                      READ MORE
                    </button>
                  </div>

                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
          <Footer />
    </>
  );
};

export default BlogPage;