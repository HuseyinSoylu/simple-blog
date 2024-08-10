import { Router, Request, Response } from "express";
import pool from "../db";
import logger from "../logger";

const router = Router();

// Route to seed sample data
// POST /seed
router.post("/", async (req: Request, res: Response) => {
  const createPostQuery = `
    INSERT INTO posts (title, content)
    VALUES
      ($1, $2),
      ($3, $4),
      ($5, $6),
      ($7, $8),
      ($9, $10),
      ($11, $12),
      ($13, $14),
      ($15, $16),
      ($17, $18),
      ($19, $20)
    ON CONFLICT (id) DO NOTHING;
  `;

  const samplePosts = [
    [
      "Exploring the Future of AI Technology",
      "Artificial Intelligence (AI) is transforming the world as we know it. From autonomous vehicles to sophisticated algorithms predicting human behavior, AI is rapidly becoming an integral part of our daily lives. This post explores the advancements in AI technology, its current applications, and future trends that could shape various industries.",
    ],
    [
      "A Comprehensive Guide to Web Development Trends in 2024",
      "The world of web development is constantly evolving, with new technologies and frameworks emerging every year. In 2024, we are seeing significant shifts towards JAMstack architecture, serverless computing, and enhanced user experience with progressive web apps (PWAs). This guide delves into these trends, offering insights and recommendations for developers to stay ahead in the competitive field of web development.",
    ],
    [
      "The Impact of Remote Work on Company Culture",
      "Remote work has become a prominent feature in the modern workplace, but how does it affect company culture? This post discusses the challenges and opportunities associated with remote work, including maintaining team cohesion, fostering collaboration, and ensuring employee engagement. It also provides tips for managers to effectively lead remote teams and build a positive remote work culture.",
    ],
    [
      "Sustainable Practices in the Fashion Industry",
      "The fashion industry is one of the most polluting industries in the world, but there is a growing movement towards sustainability. This article explores the various ways in which fashion brands are adopting eco-friendly practices, from using sustainable materials to reducing waste through circular fashion. It highlights innovative brands and provides actionable steps for consumers to make more sustainable fashion choices.",
    ],
    [
      "Understanding Blockchain Technology and Its Applications",
      "Blockchain technology, best known as the foundation of cryptocurrencies, has far-reaching applications beyond digital currencies. This post explains the core concepts of blockchain, including decentralized ledgers and smart contracts, and explores its potential applications in areas such as supply chain management, healthcare, and finance. It also discusses the challenges and future prospects of blockchain technology.",
    ],
    [
      "The Evolution of Digital Marketing Strategies",
      "Digital marketing continues to evolve with advancements in technology and changing consumer behaviors. In this post, we review the latest strategies in digital marketing, including the rise of influencer marketing, the use of artificial intelligence for personalization, and the importance of data analytics. Learn how businesses can leverage these strategies to improve their marketing efforts and achieve better results.",
    ],
    [
      "How to Build and Maintain a Personal Brand Online",
      "In today’s digital age, building a strong personal brand is crucial for career growth and professional success. This guide offers practical advice on how to create and maintain a compelling personal brand online. From establishing your online presence through social media and personal websites to engaging with your audience and showcasing your expertise, discover the key steps to building a personal brand that stands out.",
    ],
    [
      "The Role of Cybersecurity in Protecting Personal Data",
      "As cyber threats become more sophisticated, protecting personal data has never been more important. This article discusses the importance of cybersecurity measures for safeguarding sensitive information, including tips for individuals and organizations to enhance their security practices. Topics covered include password management, encryption, and staying informed about the latest cybersecurity threats.",
    ],
    [
      "Innovations in Renewable Energy Technology",
      "Renewable energy is crucial for combating climate change and ensuring a sustainable future. This post explores recent innovations in renewable energy technology, including advancements in solar panels, wind turbines, and energy storage solutions. It also discusses the impact of these innovations on the global energy market and the steps being taken to increase the adoption of renewable energy sources.",
    ],
    [
      "The Future of Healthcare: Telemedicine and Virtual Health",
      "Telemedicine has gained prominence in recent years, especially in the wake of the COVID-19 pandemic. This article examines the future of telemedicine and virtual health, including the benefits and challenges of remote healthcare services. It also looks at emerging technologies such as virtual reality and artificial intelligence in healthcare and their potential to transform patient care and medical practice.",
    ],
  ];

  const flattenedPosts = samplePosts.flat();

  try {
    await pool.query(createPostQuery, flattenedPosts);
    logger.info("Sample posts created successfully.");
    res.status(200).send("Sample posts created successfully.");
  } catch (err) {
    logger.error("Error seeding posts: ", err);
    res.status(500).send("Error seeding posts.");
  }
});

export default router;
