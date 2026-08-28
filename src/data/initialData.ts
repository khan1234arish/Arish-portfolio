import { SiteContent } from './types';

export const initialSiteContent: SiteContent = {
  profile: {
    name: 'Arish',
    role: 'Web & App Developer',
    rolesList: ['Websites', 'Web Applications', 'iOS Applications'],
    tagline: 'I design and build modern digital experiences.',
    bioShort:
      'Independent web and app developer crafting websites, web apps, and native mobile apps built with thoughtful design, tactile interaction, and uncompromising performance.',
    bioDetailed: [
      'I am an independent developer who approaches digital product creation with design sensitivity and engineering rigor. I design and build modern websites, scalable web applications, and mobile apps across iOS and Android.',
      'My work spans full-scale client production platforms like MEHAR as well as comprehensive self-built digital products—including restaurant QR ordering platforms, cross-platform salon booking systems, esports gaming center management suites, and modern e-commerce architectures.',
      'I prioritize crisp visual hierarchy, sub-second latency, accessible semantics, and purposeful 60fps motion rather than decorative clutter.',
    ],
    email: 'khan1234arish@gmail.com',
    phone: '+91 8287313307',
    location: 'India',
    avatarUrl: '',
    socialLinks: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      email: 'khan1234arish@gmail.com',
      phone: '+91 8287313307',
      whatsapp: 'https://wa.me/918287313307',
    },
  },
  availability: {
    isAvailable: true,
    statusType: 'select_projects',
    statusLabel: 'CURRENTLY AVAILABLE FOR NEW PROJECTS',
    statusNote: 'Open for freelance contracts, full-stack product builds, and iOS apps.',
  },
  projects: [
    {
      id: 'proj-mehar',
      slug: 'mehar',
      title: 'MEHAR',
      category: 'Web Application',
      projectNature: 'production',
      badge: 'CLIENT PRODUCTION',
      platforms: ['Web'],
      subtitle: 'Enterprise B2B Lithium Battery & Clean Energy Platform',
      featured: true,
      order: 1,
      year: '2024',
      coverImage: '/projects/mehar-hero.png',
      mockupType: 'browser',
      accentColor: '#DC2626',
      shortDescription:
        'A full-scale production B2B digital platform engineered and deployed for battery manufacturer MEHAR (Lawad Infrastructure). Features high-density technical spec catalogs, dynamic RFQ generator, and interactive pack finder.',
      fullDescription:
        'MEHAR is a custom B2B enterprise platform engineered for commercial electric vehicle OEMs, solar energy integrators, and industrial battery distributors across India. I personally designed, developed, and deployed the complete digital platform to translate complex battery engineering specifications—such as AIS-156 Phase 2 compliance, prismatic cell chemistry, and Smart BMS telemetry—into a high-performance digital procurement workflow.',
      role: 'Design, Full-Stack Architecture & Deployment',
      client: 'Lawad Infrastructure Private Limited',
      liveUrl: 'https://www.meharbatteries.com/',
      technologies: [
        'Next.js 14',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Framer Motion',
        'Lucide Icons',
        'Vercel',
      ],
      highlights: [
        'Real deployed production platform serving commercial B2B procurement in India',
        'Architected comprehensive interactive catalog for AIS-156 Phase 2 certified prismatic & NMC packs',
        'Engineered custom interactive RFQ (Request for Quotation) generator and structured quotation pipeline',
        'Built real-time battery finder tool and dynamic cell chemistry specification explorer',
      ],
      metrics: [
        {
          value: 'Production',
          label: 'Project Status',
          description: 'Live deployment on Vercel',
        },
        {
          value: '< 0.8s',
          label: 'LCP Performance',
          description: 'Optimized for high-speed mobile and desktop delivery',
        },
        {
          value: '100%',
          label: 'Responsive Fidelity',
          description: 'Custom UI optimized for executive and field sales use',
        },
      ],
      architecture: {
        clientLayer: 'Next.js App Router with Server-Side Generation & dynamic client-side filtering',
        stateAndData: 'Reactive state management for RFQ builder and real-time battery finder filters',
        designSystem: 'Custom dark technical UI token system engineered for high data density and contrast',
        performanceAndOps: 'Edge caching, optimized asset pipelines, zero layout-shift font loading',
      },
      keyFeatures: [
        {
          title: 'Interactive Battery Spec Matrix',
          description:
            'Engineers can compare operating voltage (2.5V–3.65V), Ah capacities, laser-welded busbar topologies, and BMS communication protocols (CAN/RS485/UART) dynamically.',
        },
        {
          title: 'B2B RFQ Generator',
          description:
            'Commercial procurement managers configure pack batches, specify cell format requirements, and submit instant volume RFQ dossiers.',
        },
        {
          title: 'Interactive Pack Finder',
          description:
            'Filtered search engine matching commercial vehicle payloads (2-wheelers, 3-wheelers, solar ESS) with certified pack configurations.',
        },
      ],
      problemAndContext:
        'Industrial lithium battery procurement in India typically relies on slow, fragmented PDF spec sheets and friction-heavy manual sales calls. MEHAR required an authoritative, modern digital platform that communicated uncompromising engineering compliance (AIS-156 Phase 2) while streamlining quotation cycles for commercial OEMs.',
      solutionAndDesign:
        'Developed a dark, high-contrast digital flagship platform featuring rapid technical filtering, immediate spec verification, and an automated RFQ pipeline. The UI emphasizes clarity, heavy engineering metrics, and tactile interactions without decorative bloat.',
      outcomeAndImpact:
        'Successfully deployed to production at meharbatteries.com, serving as MEHAR’s primary digital platform for commercial OEMs and industrial battery partners nationwide.',
    },
    {
      id: 'proj-dineflow',
      slug: 'dineflow',
      title: 'DINEFLOW',
      category: 'Web Application',
      projectNature: 'personal_build',
      badge: 'BUILT BY ME',
      platforms: ['Web'],
      subtitle: 'QR Table Ordering & Real-Time Restaurant Management Platform',
      featured: true,
      order: 2,
      year: '2024',
      coverImage: '/projects/dineflow-hero.png',
      mockupType: 'browser',
      accentColor: '#DC2626',
      shortDescription:
        'A complete restaurant ordering and table-management system. Features unique per-table QR generation, instant web ordering with zero app download, live Kitchen Display System (KDS) queues, and table turnover tracking.',
      fullDescription:
        'DINEFLOW is a full-scale restaurant management and digital table-ordering platform designed and engineered to streamline dining operations. Diners scan a unique QR code placed at their table to open the digital menu directly in their mobile browser, customize items with add-ons and dietary preferences, add items to cart, and place orders automatically mapped to their table number. Restaurant managers and kitchen staff utilize a centralized real-time dashboard featuring live ticket queues, table occupancy management, menu availability toggling, and order status updates.',
      role: 'Full-Stack Architecture & Product Design',
      technologies: [
        'Next.js 14',
        'TypeScript',
        'Tailwind CSS',
        'Framer Motion',
        'WebSocket / Real-Time State',
        'PostgreSQL',
      ],
      highlights: [
        'Engineered instant browser-based QR table ordering requiring zero app installation for diners',
        'Built dynamic QR code generation and printable asset export for individual table numbers',
        'Architected real-time Kitchen Display System (KDS) queue with instant ticket status workflows',
        'Implemented table occupancy visualizer and dining floor turnover tracking',
      ],
      metrics: [
        {
          value: 'Built By Me',
          label: 'Product Origin',
          description: 'Independent full-stack build',
        },
        {
          value: 'Real-Time',
          label: 'KDS Sync',
          description: 'Sub-second order dispatch to kitchen',
        },
        {
          value: 'Zero Install',
          label: 'Guest Access',
          description: 'Instant mobile web QR flow',
        },
      ],
      architecture: {
        clientLayer: 'Next.js App Router with responsive mobile-first dining UI and desktop kitchen dashboard',
        stateAndData: 'Optimistic cart state with real-time websocket synchronization for kitchen queues',
        designSystem: 'Dark high-contrast culinary theme with crimson status highlights and touch-friendly targets',
        performanceAndOps: 'Edge-rendered digital menus with instant image caching and offline resilience',
      },
      keyFeatures: [
        {
          title: 'Unique Per-Table QR Ordering Flow',
          description:
            'Every table possesses a distinct QR code. Scanning launches an instant digital menu automatically bound to that table number with live status tracking.',
        },
        {
          title: 'Interactive Item Customizer & Cart',
          description:
            'Diners select portion sizes, spice levels, dietary preferences, and custom notes before submitting orders directly to the kitchen.',
        },
        {
          title: 'Live Kitchen Display System (KDS)',
          description:
            'Kitchen operators manage incoming order tickets with status transitions (Pending -> In Preparation -> Ready for Table).',
        },
        {
          title: 'Table & Floor Management Dashboard',
          description:
            'Floor managers visualize table occupancy, assign table numbers, and generate new QR codes dynamically.',
        },
        {
          title: 'Menu & 86’d Item Availability Controls',
          description:
            'Immediate one-click toggling for out-of-stock items, category reorganization, and dynamic menu updates.',
        },
      ],
      problemAndContext:
        'Traditional restaurant dining often encounters delays during peak hours due to physical menu shortages and waiter availability bottlenecks. DINEFLOW eliminates ordering friction while giving restaurant operators real-time control over their floor and kitchen flow.',
      solutionAndDesign:
        'Engineered an ultra-fast, zero-friction mobile web experience for guests paired with an authoritative, responsive operations dashboard for restaurant staff.',
    },
    {
      id: 'proj-salonsync',
      slug: 'salonsync',
      title: 'SALONSYNC',
      category: 'Web & Mobile Platform',
      projectNature: 'personal_build',
      badge: 'BUILT BY ME',
      platforms: ['Web', 'iOS', 'Android'],
      subtitle: 'Cross-Platform Salon Booking & Multi-Staff Operations Platform',
      featured: true,
      order: 3,
      year: '2024',
      coverImage: '/projects/salonsync-hero.png',
      mockupType: 'dual',
      accentColor: '#DC2626',
      shortDescription:
        'A comprehensive salon appointment and business operations platform engineered across Responsive Web, iOS, and Android. Features service catalogs, staff specialist selection, multi-chair master calendar scheduling, and customer CRM profiles.',
      fullDescription:
        'SALONSYNC is a complete salon, spa, and grooming operations platform built across web and native mobile platforms. The customer application allows clients to explore detailed service menus with durations, pick their preferred stylist, select available date and time slots from a live calendar, and receive instant booking confirmations. The salon owner and administrator interface provides a multi-chair master calendar, staff shift and capability rosters, service pricing and duration configuration, and customer management.',
      role: 'Cross-Platform Architecture & UI/UX Design',
      technologies: [
        'React Native / Expo',
        'Next.js 14',
        'TypeScript',
        'Tailwind CSS',
        'Swift / Kotlin Native Bridges',
        'PostgreSQL',
      ],
      highlights: [
        'Engineered cross-platform architecture shared across Responsive Web, iOS, and Android',
        'Built interactive multi-chair master calendar with drag-and-drop booking adjustment',
        'Implemented stylist specialist selection matching client requests with staff availability',
        'Architected comprehensive client CRM tracking appointment history and custom treatment notes',
      ],
      metrics: [
        {
          value: 'Built By Me',
          label: 'Product Origin',
          description: 'Independent cross-platform build',
        },
        {
          value: '3 Platforms',
          label: 'Ecosystem',
          description: 'Responsive Web · iOS · Android',
        },
        {
          value: 'Multi-Chair',
          label: 'Calendar Engine',
          description: 'Concurrent staff & station scheduling',
        },
      ],
      architecture: {
        clientLayer: 'React Native & TypeScript with Next.js web portal sharing unified type-safe API schema',
        stateAndData: 'Optimistic slot reservation lock engine preventing double-booking across channels',
        designSystem: 'Minimal luxury aesthetic featuring dark slate surfaces, crimson accent tokens, and fluid date pickers',
        performanceAndOps: 'Push notification worker for appointment confirmations and schedule reminders',
      },
      keyFeatures: [
        {
          title: 'Service Catalog with Durations',
          description:
            'Clients browse categorized haircut, styling, coloring, and treatment menus with precise duration breakdowns.',
        },
        {
          title: 'Stylist & Specialist Selection',
          description:
            'Enables clients to choose specific team members based on specialization, viewing real-time individual availability.',
        },
        {
          title: 'Multi-Chair Master Calendar',
          description:
            'Salon managers view all styling chairs side-by-side with color-coded appointment statuses and quick rescheduling.',
        },
        {
          title: 'Staff Roster & Shift Management',
          description:
            'Configure working days, break intervals, assigned services, and leave schedules for individual staff members.',
        },
        {
          title: 'Customer Appointment History & CRM',
          description:
            'Maintains client profiles, visit frequency, past service history, and custom styling preferences.',
        },
      ],
      problemAndContext:
        'Salons frequently struggle with double-bookings, phone call interruptions, and fragmented appointment books. SALONSYNC creates a unified booking system accessible on web and mobile devices for both clients and owners.',
      solutionAndDesign:
        'Built with a refined, tactile interface prioritizing quick appointment discovery for clients and a clear visual calendar overview for salon administrators.',
    },
    {
      id: 'proj-game-hub',
      slug: 'game-hub',
      title: 'GAME HUB',
      category: 'Web & Mobile Platform',
      projectNature: 'personal_build',
      badge: 'BUILT BY ME',
      platforms: ['Web', 'iOS', 'Android'],
      subtitle: 'Multi-Station PS5 & Gaming PC Arena Booking & Operations Suite',
      featured: true,
      order: 4,
      year: '2024',
      coverImage: '/projects/gamehub-hero.png',
      mockupType: 'dual',
      accentColor: '#DC2626',
      shortDescription:
        'A complete gaming center management and booking platform across Web, iOS, and Android. Engineered for venues with dedicated PS5 console stations and high-spec PC rigs with real-time station availability, seat locking, and live session tracking.',
      fullDescription:
        'GAME HUB is a specialized gaming center reservation and arena operations platform built for commercial esports lounges. The platform categorizes gaming hardware into separate PS5 4K stations and liquid-cooled PC rigs, allowing gamers to inspect hardware specifications, select session durations, and reserve specific station numbers in real time. The arena management suite gives operators live station occupancy tracking, session countdown timers, remote station status toggles, booking calendars, and utilization analytics.',
      role: 'Full-Stack & Mobile Architecture',
      technologies: [
        'React Native',
        'Next.js 14',
        'TypeScript',
        'Tailwind CSS',
        'WebSocket Telemetry',
        'PostgreSQL',
      ],
      highlights: [
        'Architected cross-platform gaming reservation system across Web, iOS, and Android',
        'Engineered hardware station categorization separating 4K PS5 stations from high-spec PC rigs',
        'Built live station availability matrix with instant interactive seat locking',
        'Implemented real-time session countdown timers and arena utilization dashboard',
      ],
      metrics: [
        {
          value: 'Built By Me',
          label: 'Product Origin',
          description: 'Independent gaming suite build',
        },
        {
          value: '3 Platforms',
          label: 'Availability',
          description: 'Responsive Web · iOS · Android',
        },
        {
          value: 'Live Sync',
          label: 'Station Matrix',
          description: 'Real-time seat lock telemetry',
        },
      ],
      architecture: {
        clientLayer: 'Next.js 14 web client and React Native mobile apps with dark esports UI theme',
        stateAndData: 'Websocket-backed state engine tracking station status (Available, In Session, Reserved, Maintenance)',
        designSystem: 'Dark obsidian theme with high-visibility crimson status indicators and tactile station cards',
        performanceAndOps: 'Automated background cron triggers for session expiration and notification alerts',
      },
      keyFeatures: [
        {
          title: 'PS5 & Gaming PC Station Separation',
          description:
            'Gamers browse dedicated station categories showcasing GPU specs, display refresh rates, installed titles, and peripheral setups.',
        },
        {
          title: 'Real-Time Station Seat Lock & Booking',
          description:
            'Interactive arena map allows gamers to select exact station numbers, booking date/time, and multi-hour session durations.',
        },
        {
          title: 'Live Session Countdown Tracker',
          description:
            'Operators track active sessions in real time with visual countdown clocks and one-click session extension actions.',
        },
        {
          title: 'Arena Station Hardware Manager',
          description:
            'Manage station hardware profiles, installed game libraries, controller statuses, and maintenance schedules.',
        },
        {
          title: 'Arena Utilization & Booking Calendar',
          description:
            'Master calendar overview for tournament slots, peak-hour telemetry, and station occupancy rates.',
        },
      ],
      problemAndContext:
        'Esports centers and gaming lounges often manage station bookings through chaotic WhatsApp chats and manual registers, causing station contention and billing confusion. GAME HUB delivers automated station allocation and clear hardware transparency.',
      solutionAndDesign:
        'Engineered a fast, esports-inspired digital booking experience that provides instant seat locks for players and complete floor control for arena staff.',
    },
    {
      id: 'proj-urban-bazaar',
      slug: 'urban-bazaar',
      title: 'URBAN BAZAAR',
      category: 'Web Application',
      projectNature: 'personal_build',
      badge: 'BUILT BY ME',
      platforms: ['Web'],
      subtitle: 'Modern Modular Headless E-Commerce & Merchant Operations Suite',
      featured: true,
      order: 5,
      year: '2024',
      coverImage: '/projects/urbanbazaar-hero.png',
      mockupType: 'browser',
      accentColor: '#DC2626',
      shortDescription:
        'A complete modern e-commerce storefront and merchant operations platform. Features multi-faceted catalog filtering, variant matrices, tactile slideout micro-cart, multi-step checkout, and real-time inventory management.',
      fullDescription:
        'URBAN BAZAAR is a full-stack digital commerce platform engineered for high-converting customer storefronts and comprehensive merchant management. Built with Next.js App Router, the customer experience provides instant search autocomplete, faceted category filtering, color/size variant switching, a tactile slide-over cart with optimistic state updates, and a streamlined multi-step checkout flow. The merchant administration portal equips store operators with real-time SKU inventory tracking, catalog curation, order fulfillment pipelines, and customer purchase analytics.',
      role: 'Full-Stack Architecture & UI Engineering',
      technologies: [
        'Next.js 14',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Framer Motion',
        'PostgreSQL',
      ],
      highlights: [
        'Built full-featured customer storefront with faceted filtering, instant search, and variant matrices',
        'Engineered tactile slideout micro-cart drawer with optimistic client state updates',
        'Architected comprehensive merchant administration portal for products, inventory, and orders',
        'Implemented visual order fulfillment pipeline tracking orders from placement to delivery',
      ],
      metrics: [
        {
          value: 'Built By Me',
          label: 'Product Origin',
          description: 'Independent full-stack build',
        },
        {
          value: 'Zero Shift',
          label: 'CLS Stability',
          description: 'Strict aspect-ratio image pre-allocation',
        },
        {
          value: 'End-to-End',
          label: 'Commerce Suite',
          description: 'Storefront + Merchant Admin',
        },
      ],
      architecture: {
        clientLayer: 'Next.js App Router with Server Components for storefront and interactive client islands for checkout',
        stateAndData: 'Client-side cart store with optimistic synchronization and server-side inventory validation',
        designSystem: 'Monochrome luxury aesthetic featuring dark titanium surfaces, subtle borders, and smooth spring drawers',
        performanceAndOps: 'Edge image optimization with WebP encoding and sub-second static generation',
      },
      keyFeatures: [
        {
          title: 'Faceted Product Catalog & Search',
          description:
            'Instant search autocomplete with multi-attribute category filtering, attribute sorting, and dynamic grid layouts.',
        },
        {
          title: 'Variant Matrix & Stock Verification',
          description:
            'Dynamic switching across size, color, and finish variants with immediate stock availability reflection.',
        },
        {
          title: 'Tactile Slideout Micro-Cart & Checkout',
          description:
            'Non-intrusive drawer with instant quantity adjustments, address input validation, and clear order confirmation.',
        },
        {
          title: 'Merchant Inventory & SKU Dashboard',
          description:
            'Real-time stock level monitoring with low-inventory threshold warnings and bulk catalog curation.',
        },
        {
          title: 'Order Fulfillment & Status Pipeline',
          description:
            'Visual order pipeline guiding staff through Order Placed, Processing, Dispatched, and Delivered stages.',
        },
      ],
      problemAndContext:
        'Many digital commerce websites suffer from slow page loads, bloated third-party plugin scripts, and rigid checkout templates. URBAN BAZAAR demonstrates what a lean, high-craft modern commerce platform should feel like.',
      solutionAndDesign:
        'Engineered with modern web standards, pairing a fast customer-facing shopping experience with a clean merchant management system.',
    },
  ],
  services: [
    {
      id: 'srv-1',
      number: '01',
      title: 'WEBSITES',
      subtitle: 'Digital Flagships & Editorial Experiences',
      description:
        'Modern, responsive websites designed specifically around the product and brand. Built with semantic structure, search-engine optimization, sub-second load times, and custom typography that commands authority.',
      deliverables: [
        'Custom bespoke responsive design',
        'Sub-second Core Web Vitals optimization',
        'SEO architecture & OpenGraph metadata',
        'Accessible, semantic HTML5 structure',
        'Content management & dynamic routing',
      ],
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
    },
    {
      id: 'srv-2',
      number: '02',
      title: 'WEB APPS',
      subtitle: 'Scalable Platforms & Interactive Tools',
      description:
        'Interactive web applications, platforms, and custom digital products. Architected for speed, complex state handling, resilient API integrations, and robust real-time workflows.',
      deliverables: [
        'Complex reactive frontend architecture',
        'Type-safe end-to-end data flow',
        'Authentication & role-based access',
        'High-density data tables & dashboards',
        'Interactive calculators & custom builders',
      ],
      technologies: ['TypeScript', 'Next.js', 'React', 'Node.js', 'PostgreSQL', 'REST / GraphQL'],
    },
    {
      id: 'srv-3',
      number: '03',
      title: 'iOS & MOBILE APPS',
      subtitle: 'Fluid Native & Cross-Platform Experiences',
      description:
        'Modern mobile applications with polished native experiences across iOS and Android. Engineered with Swift, SwiftUI, and React Native with fluid gestures and rock-solid offline persistence.',
      deliverables: [
        'Native SwiftUI & Swift iOS architecture',
        'Cross-platform React Native & Expo builds',
        'Fluid 120Hz gesture interactions',
        'Offline-first data persistence & sync',
        'App Store readiness & packaging',
      ],
      technologies: ['Swift', 'SwiftUI', 'React Native', 'Combine', 'SwiftData', 'Xcode'],
    },
  ],
  process: [
    {
      step: '01',
      title: 'DISCOVER',
      subtitle: 'Strategy & Requirements',
      description:
        'Understand the idea, target users, technical constraints, and product requirements to establish a clear architectural roadmap.',
      deliverables: [
        'Technical feasibility analysis',
        'Information architecture map',
        'Core user flow definition',
        'Tech stack specification',
      ],
    },
    {
      step: '02',
      title: 'DESIGN',
      subtitle: 'Visual & Interaction Systems',
      description:
        'Create the visual language, typography scales, dark surface tokens, and interactive micro-animations that define the product feel.',
      deliverables: [
        'High-fidelity component design',
        'Responsive layout blueprints',
        'Design token specification',
        'Micro-interaction prototypes',
      ],
    },
    {
      step: '03',
      title: 'BUILD',
      subtitle: 'Clean, Scalable Engineering',
      description:
        'Develop the product with clean, type-safe, and scalable code. Prioritize sub-second load times, 60fps animations, and maintainable architecture.',
      deliverables: [
        'Modular component implementation',
        'Type-safe API integrations',
        'Performance & memory optimization',
        'Accessibility compliance testing',
      ],
    },
    {
      step: '04',
      title: 'LAUNCH',
      subtitle: 'Deployment & Refinement',
      description:
        'Test thoroughly across devices and network conditions, configure production infrastructure, deploy, and refine the final experience.',
      deliverables: [
        'Cross-browser & mobile QA',
        'SEO & Core Web Vitals audit',
        'Production edge deployment',
        'Documentation & handover',
      ],
    },
  ],
  technologies: [
    {
      id: 'tech-next',
      name: 'Next.js',
      category: 'Frontend',
      level: 'Core',
      focus: 'App Router, Server Components, SSR/SSG, Edge Performance',
    },
    {
      id: 'tech-react',
      name: 'React',
      category: 'Frontend',
      level: 'Core',
      focus: 'Hooks, Concurrent Mode, State Machines, Custom Architecture',
    },
    {
      id: 'tech-ts',
      name: 'TypeScript',
      category: 'Frontend',
      level: 'Core',
      focus: 'Strict Type-Safety, Generics, End-to-End Type Sharing',
    },
    {
      id: 'tech-tailwind',
      name: 'Tailwind CSS',
      category: 'Frontend',
      level: 'Core',
      focus: 'Design Systems, Custom Tokens, Responsive Layouts, Micro-States',
    },
    {
      id: 'tech-motion',
      name: 'Framer Motion',
      category: 'Frontend',
      level: 'Core',
      focus: '60fps GPU Orchestration, Layout Transitions, Scroll Triggers',
    },
    {
      id: 'tech-rn',
      name: 'React Native',
      category: 'Mobile / Cross-Platform',
      level: 'Core',
      focus: 'Cross-Platform iOS & Android Apps, Native Modules, Expo',
    },
    {
      id: 'tech-swift',
      name: 'Swift',
      category: 'Mobile / iOS',
      level: 'Core',
      focus: 'Modern Concurrency, Swift 6 Safety, Value Semantics',
    },
    {
      id: 'tech-swiftui',
      name: 'SwiftUI',
      category: 'Mobile / iOS',
      level: 'Core',
      focus: 'Declarative UI, State & Binding, Gesture Engines, ProMotion',
    },
    {
      id: 'tech-node',
      name: 'Node.js',
      category: 'Backend & Data',
      level: 'Advanced',
      focus: 'API Development, Edge Handlers, Scripting, Build Pipelines',
    },
    {
      id: 'tech-postgres',
      name: 'PostgreSQL',
      category: 'Backend & Data',
      level: 'Advanced',
      focus: 'Relational Schemas, Indexing, Query Optimization',
    },
    {
      id: 'tech-git',
      name: 'Git & Architecture',
      category: 'Architecture & Tools',
      level: 'Core',
      focus: 'Clean Commits, CI/CD Workflows, Modular Repositories',
    },
  ],
  experiments: [
    {
      id: 'exp-1',
      title: 'Dynamic Crimson Spring Cursor',
      category: 'Interactive UI',
      description:
        'A friction-aware custom cursor physics engine with spring-damper inertia and magnetic element tracking.',
      tech: ['TypeScript', 'Framer Motion', 'CSS Custom Properties'],
      status: 'Live',
    },
    {
      id: 'exp-2',
      title: 'B2B Spec Matrix Telemetry Engine',
      category: 'Data Visualization',
      description:
        'High-density voltage curve generator and real-time battery thermal dissipation calculator for industrial packs.',
      tech: ['React', 'HTML5 Canvas', 'Math Engine'],
      status: 'Prototype',
    },
    {
      id: 'exp-3',
      title: 'Tactile Haptic Card Micro-Interactions',
      category: 'Mobile & Gesture',
      description:
        '3D tilt orientation matrix responding to mouse coordinate vector offsets with zero repaint thrashing.',
      tech: ['CSS 3D Transforms', 'Pointer Events API'],
      status: 'Live',
    },
  ],
  settings: {
    seoTitle: 'Arish — Web & App Developer | Websites · Web Apps · iOS Apps',
    seoDescription:
      'Personal portfolio of Arish, an independent developer designing and building modern websites, scalable web applications, and polished native iOS apps.',
    ogImageUrl: '/og-image.png',
    contactHeadline: 'HAVE AN IDEA?',
    contactSubtitle: "LET'S BUILD IT.",
    contactEmail: 'khan1234arish@gmail.com',
    contactPhone: '+91 8287313307',
    adminPin: 'arish2025',
  },
  lastUpdated: new Date().toISOString(),
};
