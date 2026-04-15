import type { Tone } from '../components/newsletter/Tone';

const blendLogoWhite = new URL('../assets/blend360-logo-white.svg', import.meta.url).toString();
const pocImg = new URL('../assets/poc.jpeg', import.meta.url).toString();

export type NewsletterIcon = 'sparkles' | 'target' | 'clock' | 'lightbulb' | 'check' | 'none';

export type NewsletterLink = {
  label: string;
  href: string;
};

export type NewsletterBadge = {
  label: string;
  tone: Tone;
};

export type NewsletterHero = {
  title: string;
  subtitle: string;
  badge: NewsletterBadge;
};

export type NewsletterImage = {
  src: string;
  alt: string;
};

export type NewsletterCard = {
  title: string;
  body?: string;
  bullets?: string[];
  tone: Tone;
  icon?: NewsletterIcon;
  link?: NewsletterLink;
};

export type NewsletterStat = {
  value: string;
  label: string;
  sub?: string;
  tone: Tone;
};

export type NewsletterComparisonRow = {
  label: string;
  before: string;
  after: string;
};

export type NewsletterStep = {
  label?: string;
  title: string;
  desc: string;
};

export type NewsletterSection =
  | {
      type: 'image';
      image: NewsletterImage;
    }
  | {
      type: 'cards';
      cards: NewsletterCard[];
    }
  | {
      type: 'stats';
      title: string;
      items: NewsletterStat[];
    }
  | {
      type: 'comparison';
      title: string;
      tone: Tone;
      columns?: {
        label: string;
        before: string;
        after: string;
      };
      items: NewsletterComparisonRow[];
    }
  | {
      type: 'steps';
      title: string;
      lead?: string;
      tone: Tone;
      steps: NewsletterStep[];
    }
  | {
      type: 'metrics';
      title: string;
      tone: Tone;
      items: NewsletterStat[];
    };

export type NewsletterPage = {
  id: string;
  brand: string;
  editionLabel: string;
  footerRight: string;
  headerGradient: string;
  icon: NewsletterIcon;
  hero: NewsletterHero;
  columns?: {
    left: NewsletterSection[];
    right: NewsletterSection[];
  };
  sections?: NewsletterSection[];
};

export type NewsletterIssue = {
  logo: NewsletterImage;
  preparedBy: string;
  pages: NewsletterPage[];
};

export const newsletter: NewsletterIssue = {
  logo: {
    src: blendLogoWhite,
    alt: 'Blend360',
  },
  preparedBy: 'Data Force',
  pages: [
    {
      id: 'ai-world-report',
      brand: 'AI World Report',
      editionLabel: 'April 2026 Edition',
      footerRight: 'AI World Report',
      headerGradient: 'bg-[linear-gradient(120deg,#0b0d0e_0%,#053057_62%,#031114_100%)]',
      icon: 'none',
      hero: {
        badge: { label: 'AI Engineer Watchlist', tone: 'cyan' },
        title: 'April 2026 AI updates every engineer should watch',
        subtitle:
          'A concise roundup of model, agent, and platform releases from OpenAI, Anthropic, Google, and Microsoft from March to April, 2026.',
      },
      columns: {
        left: [
          {
            type: 'image',
            image: {
              src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80',
              alt: 'AI robot and futuristic technology',
            },
          },
          {
            type: 'cards',
            cards: [
              {
                title: '🛠️ OpenAI launches GPT-5.4 for production-grade agent workflows',
                body:
                  'On March 5, 2026, OpenAI released GPT-5.4 across ChatGPT, API, and Codex, combining stronger reasoning, native computer use, and 1M-token context to execute long, tool-rich workflows with higher reliability and lower token overhead.',
                tone: 'amber',
                icon: 'clock',
                link: {
                  label: 'Read more',
                  href: 'https://openai.com/index/introducing-gpt-5-4/',
                },
              },
              {
                title: '🤖 Robots are leaving scripted behavior behind',
                body:
                  'At Davos 2026, robotics leaders confirmed a pivot to context-aware physical AI, where systems reason about intent, not just preprogrammed steps. With NVIDIA’s GR00T and Cosmos plus lower-cost humanoid deployments, unstructured real-world automation is moving from lab demo to market reality.',
                tone: 'amber',
                link: {
                  label: 'Read more',
                  href: 'https://blogs.nvidia.com/blog/national-robotics-week-2026/',
                },
              },
              {
                title: '💸 The Great AI Price Crash: capability up, cost down 37x',
                body:
                  'In roughly a year, inference economics flipped from scarcity to abundance: workloads that once cost $100 per million tokens are now under $3. With low-cost, long-context models surging, competitive advantage is shifting from model access to orchestration quality.',
                tone: 'cyan',
                link: {
                  label: 'Read more',
                  href: 'https://medium.com/@sanjeevpatel3007/best-ai-models-march-april-2026-every-major-release-ranked-5546e2590e8b',
                },
              },
            ],
          },
        ],
        right: [
          {
            type: 'cards',
            cards: [
              {
                title: '🔐 Anthropic unveils Project Glasswing for AI-native cyber defense',
                body:
                  'On April 7, 2026, Anthropic launched Project Glasswing, giving defenders early access to Claude Mythos Preview to find and patch vulnerabilities across critical infrastructure, backed by cross-industry partners and large-scale security credits.',
                tone: 'cyan',
                link: {
                  label: 'Read more',
                  href: 'https://www.anthropic.com/project/glasswing',
                },
              },
              {
                title: '📱 Google pushes Gemma 4 agent skills fully on-device',
                body:
                  'On April 2, 2026, Google introduced Gemma 4 edge capabilities enabling multi-step agent actions, offline code generation, and multimodal processing across mobile, desktop, and IoT with LiteRT-LM and support for 140+ languages.',
                tone: 'amber',
                link: {
                  label: 'Read more',
                  href: 'https://developers.googleblog.com/bring-state-of-the-art-agentic-skills-to-the-edge-with-gemma-4/',
                },
              },
              {
                title: '⚙️ Microsoft Foundry reaches enterprise readiness for agents',
                body:
                  'On April 9, 2026, Microsoft highlighted GA momentum for Foundry Agent Service, GPT-5.4 integration, and stable 2.0 SDKs across Python, JavaScript, Java, and .NET, moving agent operations from pilots into governed production.',
                tone: 'emerald',
                link: {
                  label: 'Read more',
                  href: 'https://devblogs.microsoft.com/foundry/whats-new-in-microsoft-foundry-mar-2026',
                },
              },
              {
                title: '🚀 Tiny Model, Giant Upset: Gemma 4 beats 400B-class rivals',
                body:
                  'Google’s 31B-parameter Gemma 4 outperformed far larger models on math, science, and coding benchmarks, showing frontier performance no longer requires frontier size. With Apache 2.0 licensing and consumer-hardware viability, high-end local AI is becoming practical for real teams.',
                tone: 'emerald',
                link: {
                  label: 'Read more',
                  href: 'https://tech-insider.org/google-gemma-4-open-model-benchmarks-2026/',
                },
              },
            ],
          },
        ],
      },
      sections: [
        {
          type: 'stats',
          title: 'Quick facts',
          items: [
            {
              value: '1M',
              label: 'GPT-5.4 context window available for longer coding workflows',
              tone: 'cyan',
            },
            {
              value: '140+',
              label: 'Languages supported by Google Gemma 4 on-device models',
              tone: 'amber',
            },
            {
              value: '2.0',
              label: 'Stable Microsoft Foundry SDK line across major languages',
              tone: 'emerald',
            },
          ],
        },
      ],
    },
    {
      id: 'data-force-solution',
      brand: 'Data Force Solution',
      editionLabel: 'April 2026 Edition',
      footerRight: 'Success Story',
      headerGradient: 'bg-[linear-gradient(120deg,#0b0d0e_0%,#053057_62%,#031114_100%)]',
      icon: 'target',
      hero: {
        badge: { label: 'Success story', tone: 'cyan' },
        title: 'Fragmented Data Blocks Insight',
        subtitle: 'Disconnected systems and limited AI capabilities prevent accurate, cross-source business insights.',
      },
      columns: {
        left: [
          {
            type: 'image',
            image: {
              src: pocImg,
              alt: 'Fragmented Data Blocks Insight',
            },
          },
          {
            type: 'cards',
            cards: [
              {
                title: 'Problem statement',
                tone: 'red',
                icon: 'lightbulb',
                bullets: [
                  'At Presidio, disconnected data sources block holistic, natural-language insights across documents and analytics',
                  'AI assistants struggle with complex, multi-system queries',
                  'Manual synthesis of SharePoint content and Fabric data slows decision-making',
                  'Enterprise governance and scale requirements are not consistently met',
                ],
              },
              {
                title: 'Why it matters',
                tone: 'amber',
                bullets: [
                  'When critical data is fragmented, leaders lack timely and holistic insights.',
                  'Without a governed AI layer, complex questions drive manual effort, risk, and missed opportunities.',
                ],
              },
            ],
          },
        ],
        right: [
          {
            type: 'cards',
            cards: [
              {
                title: 'Our solution',
                tone: 'emerald',
                icon: 'check',
                bullets: [
                  'AI query orchestration layer for multi-source queries',
                  'Automated governed retrieval (semantic + structured)',
                  'Secure architecture with APIM, auth, and observability',
                  'Seamless integration with Fabric, SharePoint, and ecosystem tools',
                ],
                link: {
                  label: 'Explore solution',
                  href: 'https://www.blend360.com/artificial-intelligence',
                },
              },
            ],
          },
          {
            type: 'comparison',
            title: 'POC outcomes',
            tone: 'cyan',
            items: [
              { label: 'Query accuracy', before: '60-65%', after: '90%+' },
              { label: 'Query time', before: '1-2 days', after: '< 5 min' },
              { label: 'Effort per query', before: '2-6 hrs', after: '< 10 min' },
              { label: 'Tech dependency', before: 'High', after: 'Low' },
              { label: 'Governance', before: 'Manual', after: 'Fully enforced' },
              { label: 'Onboarding time', before: 'Days-weeks', after: 'Hours' },
            ],
          },
        ],
      },
      sections: [
        {
          type: 'steps',
          title: 'Next steps',
          lead: 'A pragmatic rollout plan to scale value quickly.',
          tone: 'emerald',
          steps: [
            {
              title: 'Validate enterprise scope',
              desc: 'Confirm priority business use cases, data sources, and success metrics with stakeholders',
            },
            {
              title: 'Define governance model',
              desc: 'Finalize security controls, access policies, observability, and Copilot vs Custom GPT guidelines',
            },
            {
              title: 'Productionize architecture',
              desc: 'Harden routing, monitoring, error handling, and RBAC for enterprise rollout',
            },
            {
              title: 'Expand data coverage',
              desc: 'Onboard SharePoint, Fabric datasets, and high-value cross-functional scenarios',
            },
            {
              title: 'Drive adoption',
              desc: 'Finalize SOW, setup delivery team, and enable users with phased rollout',
            },
          ],
        },
        {
          type: 'metrics',
          title: 'Customer impact',
          tone: 'slate',
          items: [
            {
              value: 'Minutes',
              label: 'Faster decisions',
              sub: 'From days → minutes',
              tone: 'cyan',
            },
            {
              value: '80%',
              label: 'Higher productivity',
              sub: 'Effort reduction',
              tone: 'purple',
            },
            {
              value: '90%+',
              label: 'Better quality',
              sub: 'Source-correct accuracy',
              tone: 'emerald',
            },
            {
              value: '60-70%',
              label: 'Cost efficiency',
              sub: 'Reduced analyst/SME effort',
              tone: 'cyan',
            },
            {
              value: 'Enterprise-ready',
              label: 'Scalable architecture',
              sub: 'Production validated',
              tone: 'indigo',
            },
          ],
        },
      ],
    },
  ],
};
