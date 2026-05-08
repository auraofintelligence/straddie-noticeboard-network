window.NOTICEBOARD_DATA = {
  "project": {
    "name": "Straddie Noticeboard Network",
    "shortName": "Noticeboard Network",
    "deck": "A neutral publishing pipeline where each island business, artist, club or service keeps its own look and feel while simple .md files carry public-safe data to screens of different sizes and shapes.",
    "source": "Stradbroke Island Research Project.pdf plus Strange but True ledger, Ready S.E.T. media and disaster kiosk references",
    "status": "prototype",
    "entityCount": 159,
    "principles": [
      "The network is not one visual style. Each entity can design its own screen skin, art treatment, typography, colours and voice around a shared data shape.",
      "The boring centre is a simple .md file with frontmatter: who posted it, what type of notice it is, where it should appear, when it expires, and which local assets can be used.",
      "Devices keep a local asset library for their own screen size and fall back gracefully when a new markdown notice arrives without a matching custom asset.",
      "The entity data below is explicitly guessed from the Straddie research directory: it is a conversation map, not a claim that any group has approved participation."
    ],
    "modules": [
      "Plain .md frontmatter feed for notices, events, specials, safety notes, rosters and artist windows",
      "Per-entity theme packs so Straddie Brewing, PLFC, artists, clubs and emergency services can each look like themselves",
      "Device adapters for portrait kiosks, wall leaderboards, shop-counter tablets, ferry displays, mobile stories and offline disaster screens",
      "Public/private gates that keep member records, precise GPS, private payments, emergency details and unapproved media out of public feeds"
    ],
    "experiments": [
      "Create a sample feed folder where each notice is one markdown file with frontmatter and plain body text.",
      "Build a screen adapter that turns the same notice into a compact phone story, a shop tablet card and a 16:9 wall display tile.",
      "Ask each named entity what data it would actually want to share before treating any guessed feed as real.",
      "Use PLFC as one custom art-installation example only, not as the compulsory visual style for everyone else."
    ],
    "boundary": "All entity feed ideas are hypothesised from research notes and require direct approval before public use.",
    "categoryPages": [
      {
        "slug": "trades-and-services",
        "label": "Trades, construction and local services",
        "kind": "Repairs, builds and local capability",
        "count": 16,
        "note": "Likely public data: service areas, booking windows, weather delays, job capacity, material constraints, emergency repair availability, apprenticeships and local project updates.",
        "href": "categories/trades-and-services.html"
      },
      {
        "slug": "hospitality-and-retail",
        "label": "Food, drink, shops and island supplies",
        "kind": "Daily essentials and visitor-facing trade",
        "count": 25,
        "note": "Likely public data: opening hours, stock notes, specials, meal times, cellar or tasting windows, local produce, donation days, responsible-service notes and visitor load signals.",
        "href": "categories/hospitality-and-retail.html"
      },
      {
        "slug": "tourism-property-and-transport",
        "label": "Tourism, property, charters and transport",
        "kind": "Visitor movement and booking layer",
        "count": 7,
        "note": "Likely public data: tour times, charter weather windows, ferry status, surf-school sessions, real-estate open homes, visitor guidance, booking links and disruption notices.",
        "href": "categories/tourism-property-and-transport.html"
      },
      {
        "slug": "civic-care-and-community",
        "label": "Civic, care and community organisations",
        "kind": "Governance, care, heritage and social support",
        "count": 13,
        "note": "Likely public data: meeting dates, community programs, cultural approval pathways, heritage openings, youth opportunities, church or meditation times, grant alerts and verified community messages.",
        "href": "categories/civic-care-and-community.html"
      },
      {
        "slug": "environment-safety-and-emergency",
        "label": "Environment, wildlife, safety and emergency",
        "kind": "Public safety and resilience layer",
        "count": 8,
        "note": "Likely public data: safety education, public preparedness days, volunteer training, patrol status, rescue guidance, wildlife care instructions, working bees and incident-safe public updates.",
        "href": "categories/environment-safety-and-emergency.html"
      },
      {
        "slug": "sport-recreation-and-clubs",
        "label": "Sport, recreation and clubs",
        "kind": "Fixtures, facilities and community competition",
        "count": 10,
        "note": "Likely public data: fixtures, training times, junior programs, competition results, facility status, club meals, fundraising, working bees and safety reminders.",
        "href": "categories/sport-recreation-and-clubs.html"
      },
      {
        "slug": "events",
        "label": "Events, festivals and markets",
        "kind": "Calendar rhythm and visitor pressure",
        "count": 14,
        "note": "Likely public data: dates, locations, ticket links, set times, stallholder calls, course notes, road or ferry pressure, weather changes, volunteer needs and post-event public memory.",
        "href": "categories/events.html"
      },
      {
        "slug": "artists-and-creative-hubs",
        "label": "Artists, makers and creative hubs",
        "kind": "Creative economy and cultural expression",
        "count": 44,
        "note": "Likely public data: studio openings, workshops, performances, exhibition windows, artist statements, available works, accessibility notes, gallery hours, collaborative calls and public-safe story prompts.",
        "href": "categories/artists-and-creative-hubs.html"
      },
      {
        "slug": "public-figures-and-legacies",
        "label": "Public figures, legacies and story references",
        "kind": "Public biography and memory layer",
        "count": 22,
        "note": "Likely public data: approved public biography notes, legacy learning, verified event links, library or museum prompts and strict no-private-detail boundaries. These are references, not assumed participants.",
        "href": "categories/public-figures-and-legacies.html"
      }
    ]
  },
  "pipeline": [
    {
      "name": "Entity writes .md",
      "detail": "A business, artist, club or service posts one plain markdown notice with frontmatter for topic, dates, screen sizes, priority, privacy and asset hints."
    },
    {
      "name": "Human release gate",
      "detail": "The sender, editor or secretary checks consent, expiry date, tone, cultural care, safety wording and whether anything private accidentally leaked."
    },
    {
      "name": "Adapter builds variants",
      "detail": "The renderer turns the same data into different shapes: portrait kiosk, 16:9 TV, square tile, narrow ticker, mobile story or offline emergency card."
    },
    {
      "name": "Device caches locally",
      "detail": "Each device keeps its own asset library and theme pack, so the screen still works when the internet drops or a new notice arrives without fresh art."
    },
    {
      "name": "Public memory layer",
      "detail": "Expired notices can become public-safe history: event count, seasonal pattern, volunteer demand, visitor pressure and local service timing."
    }
  ],
  "screenProfiles": [
    {
      "name": "Wall installation",
      "shape": "16:9, 21:9 or custom timber frame",
      "rule": "High visual character, low interaction, big type, rotating tiles and entity-branded art skins."
    },
    {
      "name": "Shop counter tablet",
      "shape": "4:3 or 10 inch touch panel",
      "rule": "Short notices, QR handoff, specials, opening changes and staff-approved messages."
    },
    {
      "name": "Ferry or kiosk screen",
      "shape": "Portrait 9:16 or rugged public display",
      "rule": "Fast scanning, transport pressure, visitor guidance, emergency fallback and cached maps."
    },
    {
      "name": "Phone story",
      "shape": "Vertical card sequence",
      "rule": "Same source data, lighter copy, alt text, share image and a link back to the full notice."
    },
    {
      "name": "Offline fallback",
      "shape": "Low power text-first display",
      "rule": "No fancy assets required: title, location, expiry, source, verified status and action."
    }
  ],
  "entityGroups": [
    {
      "label": "Trades, construction and local services",
      "slug": "trades-and-services",
      "kind": "Repairs, builds and local capability",
      "note": "Likely public data: service areas, booking windows, weather delays, job capacity, material constraints, emergency repair availability, apprenticeships and local project updates.",
      "entities": [
        {
          "name": "Russell Specht Carpentry",
          "type": "Carpentry",
          "place": "Minjerribah",
          "share": "availability blocks, repair tips, materials notices, apprentice call-outs"
        },
        {
          "name": "Jimmy Holt",
          "type": "Architectural renovations",
          "place": "Minjerribah",
          "share": "renovation availability, build-care tips, local supplier notes"
        },
        {
          "name": "Craig Henderson",
          "type": "Construction and renovations",
          "place": "Minjerribah",
          "share": "project windows, storm-readiness notes, local jobs pipeline"
        },
        {
          "name": "Kevin Long",
          "type": "Cabinet maker",
          "place": "Minjerribah",
          "share": "workshop slots, custom-build lead times, repair or reuse tips"
        },
        {
          "name": "Henderson Construction",
          "type": "Builder and scaffolding",
          "place": "Minjerribah",
          "share": "crew availability, scaffolding windows, safety notices"
        },
        {
          "name": "Glen Campbell",
          "type": "Builder",
          "place": "Minjerribah",
          "share": "build availability, maintenance advice, local procurement requests"
        },
        {
          "name": "Geoff Pettingill",
          "type": "Builder, earthworks and crane hire",
          "place": "Minjerribah",
          "share": "plant availability, access constraints, weather-dependent service notes"
        },
        {
          "name": "Troy Groombridge",
          "type": "Bricklayer",
          "place": "Minjerribah",
          "share": "booking windows, small-job availability, apprentice or helper requests"
        },
        {
          "name": "NSI Property Maintenance",
          "type": "Handyman and garden upkeep",
          "place": "Minjerribah",
          "share": "maintenance rounds, green-waste reminders, storm clean-up capacity"
        },
        {
          "name": "Hutch Welding",
          "type": "Welding services",
          "place": "Minjerribah",
          "share": "repair capacity, marine or trailer safety reminders, booking windows"
        },
        {
          "name": "Straddie Signs",
          "type": "Local signage",
          "place": "Minjerribah",
          "share": "event sign deadlines, sponsor board options, public notice templates"
        },
        {
          "name": "Mazzoni Plant Hire",
          "type": "Plant hire",
          "place": "Minjerribah",
          "share": "machine availability, transport limits, wet-weather constraints"
        },
        {
          "name": "Stradbroke Net Marketing",
          "type": "Professional services",
          "place": "Point Lookout",
          "share": "digital campaign windows, tourism updates, local web support availability"
        },
        {
          "name": "Lanndam Pty Ltd",
          "type": "Professional services",
          "place": "Minjerribah",
          "share": "service availability, project notes, public contact windows"
        },
        {
          "name": "Locked In Services",
          "type": "Professional services",
          "place": "Minjerribah",
          "share": "service availability, booking notes, community support offers"
        },
        {
          "name": "Six by Fifty Pty Ltd",
          "type": "Professional services",
          "place": "Minjerribah",
          "share": "service availability, public project updates, workshop invitations"
        }
      ]
    },
    {
      "label": "Food, drink, shops and island supplies",
      "slug": "hospitality-and-retail",
      "kind": "Daily essentials and visitor-facing trade",
      "note": "Likely public data: opening hours, stock notes, specials, meal times, cellar or tasting windows, local produce, donation days, responsible-service notes and visitor load signals.",
      "entities": [
        {
          "name": "Straddie Brewing Co.",
          "type": "Hospitality and brewing",
          "place": "Dunwich",
          "share": "live music, biodiversity pop-ups, taps, food trucks, event nights"
        },
        {
          "name": "Stradbroke Island Beach Hotel",
          "type": "Hospitality and accommodation",
          "place": "Point Lookout",
          "share": "events, dining times, accommodation alerts, New Year's Eve notices"
        },
        {
          "name": "Taste of Straddie",
          "type": "Hospitality",
          "place": "Minjerribah",
          "share": "local flavour features, tastings, producer stories, seasonal specials"
        },
        {
          "name": "The Point Bar and Bistro",
          "type": "Hospitality",
          "place": "Point Lookout Surf Club",
          "share": "meal specials, surf-club events, safety-aware visitor notices"
        },
        {
          "name": "Whale Tail Gelati and Coffee Bar",
          "type": "Hospitality",
          "place": "Minjerribah",
          "share": "flavours, coffee hours, whale-season signals, family-friendly notices"
        },
        {
          "name": "Fever Pitch",
          "type": "Coffee van",
          "place": "Minjerribah",
          "share": "daily location, coffee hours, event pop-ups, weather cancellation notes"
        },
        {
          "name": "Rufus King Seafoods",
          "type": "Seafood retail",
          "place": "Amity Point",
          "share": "fresh catch windows, seafood availability, safe storage reminders"
        },
        {
          "name": "Stradbroke Island Foodworks",
          "type": "Grocery",
          "place": "Dunwich",
          "share": "essential stock notes, opening changes, supply disruptions, community drives"
        },
        {
          "name": "Amity Point General Store",
          "type": "Grocery",
          "place": "Amity Point",
          "share": "daily essentials, parcel notes, community messages, local specials"
        },
        {
          "name": "Spar Express Dunwich",
          "type": "Grocery",
          "place": "Dunwich",
          "share": "stock updates, opening hours, quick specials, ferry-delay supply notes"
        },
        {
          "name": "Stradbroke Island Butchery",
          "type": "Meat retail",
          "place": "Dunwich",
          "share": "weekly cuts, BBQ packs, community fundraiser packs, order deadlines"
        },
        {
          "name": "Straddie Servo and Hardware",
          "type": "Fuel and hardware",
          "place": "Dunwich",
          "share": "fuel availability, gas bottle notes, hardware stock, storm prep reminders"
        },
        {
          "name": "Stradbroke Pharmacy",
          "type": "Health retail",
          "place": "Dunwich",
          "share": "opening changes, health reminders, script collection notices, heatwave notes"
        },
        {
          "name": "Point Lookout Pharmacy",
          "type": "Health retail",
          "place": "Point Lookout",
          "share": "opening changes, sunscreen and first-aid prompts, visitor health notes"
        },
        {
          "name": "Point Lookout News Agent",
          "type": "Retail",
          "place": "Point Lookout",
          "share": "newspapers, parcels, lotto reminders, local notice drops"
        },
        {
          "name": "Straddie Super Sports",
          "type": "Sporting goods",
          "place": "Dunwich",
          "share": "gear specials, event packs, junior sport notices, repair windows"
        },
        {
          "name": "Bob Minty Surfboards",
          "type": "Surf equipment",
          "place": "Minjerribah",
          "share": "board repairs, surf notes, product drops, local rider stories"
        },
        {
          "name": "Nourish Naturally",
          "type": "Retail",
          "place": "Minjerribah",
          "share": "wellness stock, workshops, seasonal health notes, local supplier features"
        },
        {
          "name": "Noreen's Seaside Shop",
          "type": "Retail",
          "place": "Minjerribah",
          "share": "gift features, opening hours, visitor-friendly local finds"
        },
        {
          "name": "Linen Caravan",
          "type": "Retail",
          "place": "Minjerribah",
          "share": "stock arrivals, hire notes, accommodation support notices"
        },
        {
          "name": "The Green Room",
          "type": "Retail",
          "place": "Point Lookout",
          "share": "product drops, local maker features, opening changes"
        },
        {
          "name": "Straddie Market Co.",
          "type": "Retail and produce",
          "place": "Minjerribah",
          "share": "market days, stallholder call-outs, produce highlights"
        },
        {
          "name": "St Stradbroke Wine Bar and Cellar Door",
          "type": "Wine bar and retail",
          "place": "Minjerribah",
          "share": "tastings, cellar specials, small-event calendar"
        },
        {
          "name": "Cellarbrations Bottle Shop",
          "type": "Retail",
          "place": "Minjerribah",
          "share": "opening hours, specials, responsible drinking notices"
        },
        {
          "name": "St Mark's Thrift Shop",
          "type": "Op shop",
          "place": "Minjerribah",
          "share": "donation days, volunteer rosters, sale racks, community support notes"
        }
      ]
    },
    {
      "label": "Tourism, property, charters and transport",
      "slug": "tourism-property-and-transport",
      "kind": "Visitor movement and booking layer",
      "note": "Likely public data: tour times, charter weather windows, ferry status, surf-school sessions, real-estate open homes, visitor guidance, booking links and disruption notices.",
      "entities": [
        {
          "name": "Mal Starkey Seafood and Charters",
          "type": "Retail and charters",
          "place": "Minjerribah",
          "share": "charter availability, weather windows, seafood updates, safety notes"
        },
        {
          "name": "Discover Stradbroke Real Estate",
          "type": "Real estate",
          "place": "Minjerribah",
          "share": "open homes, rental availability, community notices for guests"
        },
        {
          "name": "Dolphin Property Sales",
          "type": "Real estate",
          "place": "Minjerribah",
          "share": "open homes, market updates, buyer information sessions"
        },
        {
          "name": "North Stradbroke Island Surf School",
          "type": "Recreation and tourism",
          "place": "Point Lookout",
          "share": "lesson times, surf conditions, junior sessions, safety flags"
        },
        {
          "name": "Yura Tours",
          "type": "Cultural tourism",
          "place": "Minjerribah",
          "share": "tour availability, booking prompts, cultural respect notes"
        },
        {
          "name": "Goompi Trail",
          "type": "Cultural tourism",
          "place": "Dunwich / Goompi",
          "share": "walk times, heritage learning notes, visitor behaviour prompts"
        },
        {
          "name": "SeaLink South East Queensland",
          "type": "Transport and logistics",
          "place": "Cleveland / Dunwich",
          "share": "ferry status, capacity signals, service changes, disruption notices"
        }
      ]
    },
    {
      "label": "Civic, care and community organisations",
      "slug": "civic-care-and-community",
      "kind": "Governance, care, heritage and social support",
      "note": "Likely public data: meeting dates, community programs, cultural approval pathways, heritage openings, youth opportunities, church or meditation times, grant alerts and verified community messages.",
      "entities": [
        {
          "name": "Quandamooka Yoolooburrabee Aboriginal Corporation",
          "type": "Cultural heritage and Native Title",
          "place": "Dunwich",
          "share": "public cultural notices, approved event pathways, visitor respect prompts"
        },
        {
          "name": "Straddie Chamber of Commerce",
          "type": "Business advocacy",
          "place": "Point Lookout",
          "share": "member notices, business workshops, local economy updates, grant alerts"
        },
        {
          "name": "North Stradbroke Island Aboriginal and Islander Housing Society",
          "type": "Housing and community services",
          "place": "Minjerribah",
          "share": "public service notices, meeting dates, community program updates"
        },
        {
          "name": "Nareeba Moopi Moopi Pa Aged Care",
          "type": "Aged care",
          "place": "One Mile",
          "share": "community visits, volunteer needs, public event notices"
        },
        {
          "name": "North Stradbroke Island Historical Museum",
          "type": "Heritage preservation",
          "place": "Dunwich",
          "share": "exhibitions, opening hours, research calls, volunteer days"
        },
        {
          "name": "Minjerribah and Moorgumpin Elders in Council",
          "type": "Cultural talks and Aboriginal corporation",
          "place": "Dunwich",
          "share": "public talks, community priorities, approved education notices"
        },
        {
          "name": "Youthlink",
          "type": "Youth opportunities and recreation",
          "place": "Minjerribah",
          "share": "youth activities, mentoring sessions, sport and arts invitations"
        },
        {
          "name": "Amity Point Progress Association",
          "type": "Community advocacy",
          "place": "Amity Point",
          "share": "meetings, local works, coastal adaptation updates, community notices"
        },
        {
          "name": "Lighthouse Community Church",
          "type": "Religious group",
          "place": "Dunwich",
          "share": "service times, community meals, support notices"
        },
        {
          "name": "North Stradbroke Island Buddhist Group",
          "type": "Spiritual group",
          "place": "Minjerribah",
          "share": "meditation times, public talks, retreat notices"
        },
        {
          "name": "St. Peter Chanel Church",
          "type": "Religious group",
          "place": "Minjerribah",
          "share": "service times, parish notices, community support"
        },
        {
          "name": "St. Paul of the Cross Catholic Church",
          "type": "Religious group",
          "place": "Minjerribah",
          "share": "service times, parish events, community care notices"
        },
        {
          "name": "Straddie Island News Facebook Group",
          "type": "Digital community",
          "place": "Online",
          "share": "public-safe story leads, community calls, cross-posted verified notices"
        }
      ]
    },
    {
      "label": "Environment, wildlife, safety and emergency",
      "slug": "environment-safety-and-emergency",
      "kind": "Public safety and resilience layer",
      "note": "Likely public data: safety education, public preparedness days, volunteer training, patrol status, rescue guidance, wildlife care instructions, working bees and incident-safe public updates.",
      "entities": [
        {
          "name": "Friends of Stradbroke Island",
          "type": "Environmental advocacy",
          "place": "Minjerribah",
          "share": "campaign updates, working bees, environmental education, policy notices"
        },
        {
          "name": "Stradbroke Island Management Organisation",
          "type": "Environmental and social advocacy",
          "place": "Point Lookout",
          "share": "meeting notices, planning updates, water and aquifer education"
        },
        {
          "name": "Wildlife Rescue Minjerribah",
          "type": "Fauna rescue and care",
          "place": "Point Lookout",
          "share": "wildlife alerts, rescue guidance, volunteer needs, hotline reminders"
        },
        {
          "name": "Point Lookout Surf Life Saving Club",
          "type": "Coastal safety and community hub",
          "place": "Point Lookout",
          "share": "patrol status, beach safety, events, volunteer training"
        },
        {
          "name": "Volunteer Marine Rescue North Stradbroke",
          "type": "Emergency maritime services",
          "place": "Dunwich",
          "share": "marine safety, radio checks, training days, fundraising"
        },
        {
          "name": "Rural Fire Brigade",
          "type": "Emergency fire services",
          "place": "Point Lookout / Dunwich / Amity",
          "share": "fire safety, preparedness days, volunteer call-outs, incident-safe public alerts"
        },
        {
          "name": "Point Lookout Bushcare",
          "type": "Invasive weed eradication",
          "place": "Point Lookout",
          "share": "working bees, weed alerts, volunteer rosters, before-and-after stories"
        },
        {
          "name": "Wildcare Straddie",
          "type": "Fauna care network",
          "place": "Minjerribah",
          "share": "wildlife education, care needs, rescue-safe public guidance"
        }
      ]
    },
    {
      "label": "Sport, recreation and clubs",
      "slug": "sport-recreation-and-clubs",
      "kind": "Fixtures, facilities and community competition",
      "note": "Likely public data: fixtures, training times, junior programs, competition results, facility status, club meals, fundraising, working bees and safety reminders.",
      "entities": [
        {
          "name": "Point Lookout Fishing Club",
          "type": "Fishing and community club",
          "place": "Point Lookout",
          "share": "competition dates, public catch ledger, junior clinics, sponsor thanks, safety notes"
        },
        {
          "name": "Straddie Sharks Allsports Rugby League Club",
          "type": "Sports and social club",
          "place": "Dunwich",
          "share": "fixtures, carnival notices, team calls, fundraiser updates"
        },
        {
          "name": "Point Lookout Bowls Club",
          "type": "Sports and dining",
          "place": "Point Lookout",
          "share": "social bowls, meal nights, member events, visitor invitations"
        },
        {
          "name": "Amity Point Cricket Club",
          "type": "Sports club",
          "place": "Amity Point",
          "share": "fixtures, training, working bees, junior cricket notices"
        },
        {
          "name": "Point Lookout Boardriders",
          "type": "Surfing and sports",
          "place": "Point Lookout",
          "share": "comp dates, surf safety, junior programs, club results"
        },
        {
          "name": "Stradbroke Trail Riders Horse Club",
          "type": "Equestrian",
          "place": "Minjerribah",
          "share": "ride dates, track notices, horse care reminders"
        },
        {
          "name": "North Stradbroke Island Golf Club",
          "type": "Sports and recreation",
          "place": "Dunwich",
          "share": "competition days, course conditions, social golf invitations"
        },
        {
          "name": "Point Lookout Tennis Club",
          "type": "Sports",
          "place": "Point Lookout",
          "share": "court availability, social tennis, junior sessions"
        },
        {
          "name": "Amity Fishing Club",
          "type": "Sports and recreation",
          "place": "Amity Point",
          "share": "fishing days, safety notes, member events, catch education"
        },
        {
          "name": "Dunwich Swimming Pool / Club",
          "type": "Sports",
          "place": "Dunwich",
          "share": "pool status, lesson times, swimming club notices"
        }
      ]
    },
    {
      "label": "Events, festivals and markets",
      "slug": "events",
      "kind": "Calendar rhythm and visitor pressure",
      "note": "Likely public data: dates, locations, ticket links, set times, stallholder calls, course notes, road or ferry pressure, weather changes, volunteer needs and post-event public memory.",
      "entities": [
        {
          "name": "Stradbroke Island Events",
          "type": "Event management",
          "place": "Point Lookout",
          "share": "event calendars, supplier call-outs, bump-in times, visitor notices"
        },
        {
          "name": "Straddie Salute Triathlon",
          "type": "Destination sport",
          "place": "Minjerribah",
          "share": "dates, course notes, volunteer needs, road impacts"
        },
        {
          "name": "Redlands Coast AdventureFest",
          "type": "Trail and ocean sport",
          "place": "Minjerribah",
          "share": "dates, routes, safety notices, visitor guidance"
        },
        {
          "name": "Stradbroke Chamber Music Festival",
          "type": "Music festival",
          "place": "Minjerribah",
          "share": "program, venue changes, artist talks, ticket prompts"
        },
        {
          "name": "Straddie Arts Trail",
          "type": "Arts trail",
          "place": "Island-wide",
          "share": "studio openings, artist maps, workshops, weather changes"
        },
        {
          "name": "Quandamooka Festival",
          "type": "Multi-artform cultural festival",
          "place": "Minjerribah",
          "share": "approved program notices, access notes, cultural respect prompts"
        },
        {
          "name": "Straddie Invitational",
          "type": "Team surfing competition",
          "place": "Minjerribah",
          "share": "heat schedule, results, surf conditions, club updates"
        },
        {
          "name": "Straddie Oyster Festival",
          "type": "Seafood and music",
          "place": "Minjerribah",
          "share": "food stalls, program, transport notes, sponsor thanks"
        },
        {
          "name": "Straddie Sharks Easter Carnival",
          "type": "Community sport",
          "place": "Dunwich",
          "share": "fixtures, stalls, fundraising, family notices"
        },
        {
          "name": "Straddie Hotel New Year's Eve",
          "type": "Community celebration",
          "place": "Point Lookout",
          "share": "event times, safety notes, transport reminders"
        },
        {
          "name": "Point Lookout Markets",
          "type": "Artisans and produce",
          "place": "Point Lookout",
          "share": "stallholder list, market dates, weather calls"
        },
        {
          "name": "Grass Roots Live Music",
          "type": "Live music",
          "place": "Dunwich",
          "share": "line-up, set times, venue notices, family-friendly notes"
        },
        {
          "name": "Twist Weave Workshop",
          "type": "Arts education",
          "place": "Minjerribah",
          "share": "workshop times, booking notes, material needs"
        },
        {
          "name": "Fight Night: Beer vs Wine",
          "type": "Hospitality tasting",
          "place": "Minjerribah",
          "share": "date, venue, booking link, responsible drinking notes"
        }
      ]
    },
    {
      "label": "Artists, makers and creative hubs",
      "slug": "artists-and-creative-hubs",
      "kind": "Creative economy and cultural expression",
      "note": "Likely public data: studio openings, workshops, performances, exhibition windows, artist statements, available works, accessibility notes, gallery hours, collaborative calls and public-safe story prompts.",
      "entities": [
        {
          "name": "Stradbroke Island Singers",
          "type": "Arts and choral group",
          "place": "Minjerribah",
          "share": "rehearsals, concerts, community singing invitations"
        },
        {
          "name": "Bay Players Theatre Group",
          "type": "Performing arts",
          "place": "Dunwich Community Hall",
          "share": "auditions, shows, rehearsal times, volunteer calls"
        },
        {
          "name": "Kieron Anderson",
          "type": "Food sovereignty and contemporary art",
          "place": "Minjerribah",
          "share": "food story events, workshops, studio notes, shared table prompts"
        },
        {
          "name": "Tamara Armstrong",
          "type": "Painter",
          "place": "Minjerribah",
          "share": "studio openings, exhibition windows, new works, workshop dates"
        },
        {
          "name": "Paula Boo",
          "type": "Songbird and fibre artist",
          "place": "Point Lookout",
          "share": "music dates, fibre workshops, studio availability"
        },
        {
          "name": "Gabriel D'Hage-Craig",
          "type": "Street art and digital design",
          "place": "Minjerribah",
          "share": "murals, digital drops, youth workshops, public art notes"
        },
        {
          "name": "Lauri Anderson",
          "type": "Slow maker",
          "place": "Minjerribah",
          "share": "studio times, slow-making notes, exhibition windows"
        },
        {
          "name": "Wendy Bailye",
          "type": "Feltmaker and textile artist",
          "place": "Minjerribah",
          "share": "workshop times, felt works, studio demonstrations"
        },
        {
          "name": "Steve Barwell",
          "type": "Visual artist and commentator",
          "place": "Minjerribah",
          "share": "new works, commentary nights, exhibition updates"
        },
        {
          "name": "Elizabeth Borey",
          "type": "Handmade treasures",
          "place": "Minjerribah",
          "share": "new pieces, market appearances, studio notes"
        },
        {
          "name": "Phillip and Theresa Bowman",
          "type": "Organic beekeepers and bee art",
          "place": "Minjerribah",
          "share": "honey availability, bee education, art pieces, seasonal notes"
        },
        {
          "name": "Budla Malu",
          "type": "Indigenous art operators",
          "place": "Minjerribah",
          "share": "art windows, cultural permissions, workshop invitations"
        },
        {
          "name": "Mahala Burns",
          "type": "Fabric printer and workshop facilitator",
          "place": "Minjerribah",
          "share": "print workshops, product drops, tote and cushion releases"
        },
        {
          "name": "Renata Buziak",
          "type": "Biochrome artist and researcher",
          "place": "Minjerribah",
          "share": "biochrome workshops, plant art talks, exhibition notes"
        },
        {
          "name": "Cath Carroll",
          "type": "Studio artist",
          "place": "Minjerribah",
          "share": "studio openings, landscape works, artist talks"
        },
        {
          "name": "Melany Cordier",
          "type": "Potter",
          "place": "Minjerribah",
          "share": "kiln openings, ceramic drops, workshop dates"
        },
        {
          "name": "Meredith Coyle",
          "type": "Lamp designer",
          "place": "Minjerribah",
          "share": "new designs, studio appointments, textile stories"
        },
        {
          "name": "Dr. Sandra Delaney",
          "type": "Language and culture artist",
          "place": "Minjerribah",
          "share": "approved public learning, exhibition windows, cultural care notes"
        },
        {
          "name": "Shara Delaney",
          "type": "Painter",
          "place": "Quandamooka Country",
          "share": "new works, exhibition times, Country connection statements"
        },
        {
          "name": "Jo Fay Duncan",
          "type": "Multi-media portrait artist",
          "place": "Minjerribah",
          "share": "portrait sessions, exhibition windows, story prompts"
        },
        {
          "name": "Megan Forward",
          "type": "Artist, author and illustrator",
          "place": "Minjerribah",
          "share": "book events, illustration workshops, sustainability projects"
        },
        {
          "name": "Trish Lake",
          "type": "Watercolour, pastel and acrylic artist",
          "place": "Minjerribah",
          "share": "classes, studio days, available works"
        },
        {
          "name": "Coco-May McCabe",
          "type": "Youth artist",
          "place": "Minjerribah",
          "share": "youth art moments, wildlife-inspired works, family-safe exhibition notes"
        },
        {
          "name": "Goldie Goodbun",
          "type": "Youth ceramic artist",
          "place": "Minjerribah",
          "share": "youth pottery features, exhibition notes, family-safe updates"
        },
        {
          "name": "Merri Millar",
          "type": "Porcelain jewellery and screen printing",
          "place": "Minjerribah",
          "share": "jewellery drops, shirt runs, market appearances"
        },
        {
          "name": "Jane Milburn OAM",
          "type": "Pottery, natural dyeing and stitching",
          "place": "Minjerribah",
          "share": "slow clothing workshops, dye days, exhibition windows"
        },
        {
          "name": "Tracey and Bernie Gee",
          "type": "Ceramic artists",
          "place": "Minjerribah",
          "share": "Wilder Isle Ceramic drops, raw material notes, studio windows"
        },
        {
          "name": "Penny Gillespie",
          "type": "Jeweller and metalsmith",
          "place": "Minjerribah",
          "share": "new jewellery, commission windows, studio visits"
        },
        {
          "name": "Mason",
          "type": "Woodwork creator",
          "place": "Minjerribah",
          "share": "salvaged timber pieces, workshop windows, commission notes"
        },
        {
          "name": "Ruby Poole",
          "type": "Artist",
          "place": "Minjerribah",
          "share": "bright new works, market dates, artist notes"
        },
        {
          "name": "Gil Scrine",
          "type": "Landscape and portrait painter",
          "place": "Minjerribah",
          "share": "exhibition notices, painting workshops, available works"
        },
        {
          "name": "Karen Thurecht",
          "type": "Author",
          "place": "Minjerribah",
          "share": "book talks, mystery series events, signing sessions"
        },
        {
          "name": "Zoe Maskell",
          "type": "Embroidery artist",
          "place": "Minjerribah",
          "share": "embroidery workshops, new pieces, studio times"
        },
        {
          "name": "Donna Wright",
          "type": "Professional artist",
          "place": "Minjerribah",
          "share": "exhibition windows, new works, workshops"
        },
        {
          "name": "Marie Cole",
          "type": "Mulumba Collective visual artist",
          "place": "Point Lookout",
          "share": "collective openings, new works, studio notes"
        },
        {
          "name": "Jasper Coleman",
          "type": "Mulumba Collective ceramicist",
          "place": "Point Lookout",
          "share": "ceramic drops, studio windows, collective notices"
        },
        {
          "name": "Lisa Iselin",
          "type": "Mulumba Collective artist",
          "place": "Point Lookout",
          "share": "new works, collective openings, exhibition notes"
        },
        {
          "name": "Julie Elliot",
          "type": "Mulumba Collective soap maker",
          "place": "Point Lookout",
          "share": "soap batches, market dates, maker notes"
        },
        {
          "name": "Julie Sisco",
          "type": "Mulumba Collective photographer",
          "place": "Point Lookout",
          "share": "photo exhibitions, print drops, studio notes"
        },
        {
          "name": "Sharon Walker",
          "type": "Mulumba Collective ceramicist",
          "place": "Point Lookout",
          "share": "ceramics, studio windows, exhibition notes"
        },
        {
          "name": "Amity Point Community Club",
          "type": "Historical photography exhibition hub",
          "place": "Amity Point",
          "share": "display dates, archive calls, club exhibition notes"
        },
        {
          "name": "Hidden Oasis Art Show",
          "type": "Community art exhibition",
          "place": "Minjerribah",
          "share": "fundraiser dates, school support notes, artist call-outs"
        },
        {
          "name": "Salt Water Murris",
          "type": "Quandamooka art gallery",
          "place": "Dunwich",
          "share": "gallery openings, exhibition notices, cultural care notes"
        },
        {
          "name": "Starfish Studio",
          "type": "Local art and retail studio",
          "place": "Minjerribah",
          "share": "studio hours, product drops, artist features"
        }
      ]
    },
    {
      "label": "Public figures, legacies and story references",
      "slug": "public-figures-and-legacies",
      "kind": "Public biography and memory layer",
      "note": "Likely public data: approved public biography notes, legacy learning, verified event links, library or museum prompts and strict no-private-detail boundaries. These are references, not assumed participants.",
      "entities": [
        {
          "name": "Oodgeroo Noonuccal (Kath Walker)",
          "type": "Literature, education and activism legacy",
          "place": "Moongalba / Minjerribah",
          "share": "approved legacy learning dates, public quotations with source permissions, cultural education pathways, memorial events"
        },
        {
          "name": "Jani Haenke",
          "type": "Environmental advocacy legacy",
          "place": "Cylinder Beach / Minjerribah",
          "share": "FOSI-linked legacy notes, conservation milestones, public history prompts, anniversary education"
        },
        {
          "name": "Johannes Jochim (Jack) Borey",
          "type": "Maritime history legacy",
          "place": "Minjerribah",
          "share": "public history references, maritime heritage notes, museum-linked story prompts"
        },
        {
          "name": "Tom Welsby",
          "type": "History and literature legacy",
          "place": "Amity Point / Moreton Bay",
          "share": "historical excerpts with source checks, coastal-change learning, museum and library prompts"
        },
        {
          "name": "Wesley Enoch AM",
          "type": "Performing arts and cultural leadership",
          "place": "Minjerribah / Redlands",
          "share": "public event links, theatre talks, approved biography notes, cultural-program prompts"
        },
        {
          "name": "Delvene Cockatoo-Collins",
          "type": "Visual arts and design",
          "place": "Quandamooka Country",
          "share": "studio openings, public art place-marker learning, approved exhibition notices, design-story links"
        },
        {
          "name": "Ethan Ewing",
          "type": "Professional surfing",
          "place": "Minjerribah",
          "share": "public competition links, junior surf inspiration, local club celebration notes, verified media only"
        },
        {
          "name": "Bede Durbidge",
          "type": "Professional surfing and coaching",
          "place": "Minjerribah",
          "share": "public coaching events, surf-community notes, competition legacy links, verified media only"
        },
        {
          "name": "Matt Burns",
          "type": "Cultural tourism and education",
          "place": "Goompi / Dunwich",
          "share": "approved tour information, cultural respect prompts, public learning sessions, booking pathways"
        },
        {
          "name": "Belinda Close",
          "type": "Visual arts and public place markers",
          "place": "Quandamooka Country",
          "share": "approved public art notes, exhibition links, place-marker learning, cultural permission reminders"
        },
        {
          "name": "Lincoln Lewis",
          "type": "Film and television",
          "place": "Redlands / Minjerribah connection",
          "share": "verified public appearances, fundraiser links, community event mentions, no private residence detail"
        },
        {
          "name": "Karl Stefanovic",
          "type": "Television and media",
          "place": "Redlands connection",
          "share": "verified public media references, disaster-reporting context, community event mentions, no private detail"
        },
        {
          "name": "Peter Stefanovic",
          "type": "Television and journalism",
          "place": "Redlands connection",
          "share": "verified public media references, weather or civic reporting context, public appearances only"
        },
        {
          "name": "Wally Lewis",
          "type": "Sport and media",
          "place": "Birkdale / Redlands",
          "share": "verified public sports legacy notes, civic event links, public appearances only"
        },
        {
          "name": "Natalie Cook OAM",
          "type": "Sport and civic leadership",
          "place": "Redlands",
          "share": "verified public event links, sport participation prompts, civic program mentions"
        },
        {
          "name": "Val Lehman",
          "type": "Film and television",
          "place": "Southern Moreton Bay Islands / Redlands",
          "share": "verified public appearances, arts events, media references only"
        },
        {
          "name": "Jordan Patrick Smith",
          "type": "Film and television",
          "place": "Redlands connection",
          "share": "verified public appearances, arts education prompts, media references only"
        },
        {
          "name": "Rowena Cory Daniells",
          "type": "Literature",
          "place": "Redlands",
          "share": "book talks, library links, writing workshops, verified author events"
        },
        {
          "name": "Marianne de Pierres",
          "type": "Literature",
          "place": "Ormiston / Redlands",
          "share": "book events, speculative-fiction talks, library or festival links, verified author notices"
        },
        {
          "name": "Jesse Williams",
          "type": "Sport",
          "place": "Birkdale / Redlands",
          "share": "verified public sports legacy notes, youth sport inspiration, public appearances only"
        },
        {
          "name": "Paul Bishop",
          "type": "Politics, television and civic leadership",
          "place": "Birkdale / Thorneside / Redlands",
          "share": "public civic notices, arts and community events, official-source references only"
        },
        {
          "name": "Kay Danes",
          "type": "Literature and humanitarian work",
          "place": "Wellington Point / Redlands",
          "share": "book talks, humanitarian campaign links, library events, verified public notices"
        }
      ]
    }
  ],
  "markdownExamples": [
    {
      "title": "Notice file",
      "code": "---\nid: plfc-2026-06-junior-clinic\npublisher: Point Lookout Fishing Club\ntype: event\nvisibility: public\nstarts: 2026-06-14T08:30:00+10:00\nexpires: 2026-06-14T13:00:00+10:00\ntown: Point Lookout\nscreen_targets: [wall_16x9, kiosk_portrait, phone_story]\nasset_pack: plfc/default\npriority: normal\nprivate_fields_removed: true\n---\nJunior fishing clinic this Sunday. Bring hat, water and a parent or guardian. Broad safety notes only; no private member details in this notice."
    },
    {
      "title": "Entity theme",
      "code": "---\nentity: Straddie Brewing Co.\ntheme_pack: straddie-brewing/live-music\nallowed_colours: [amber, deep_green, cream]\nlogo_asset: logo-wide.webp\nfallback_layouts: [square_tile, narrow_ticker, portrait_card]\nvoice: warm, local, relaxed\n---\nThe data stays standard, but the screen can still look and sound like the venue."
    },
    {
      "title": "Device manifest",
      "code": "---\ndevice_id: dunwich-ferry-kiosk-01\nscreen_shape: portrait_9x16\nasset_cache: /noticeboard/assets/dunwich-ferry-kiosk-01\nsync_mode: local_first\nfallback_mode: text_only\nmax_notice_age_hours: 72\n---\nThis device can render any approved notice, but it chooses portrait-safe layouts and cached assets first."
    }
  ],
  "sampleFeeds": [
    "noticeboard/feeds/plfc-junior-clinic.md",
    "noticeboard/feeds/straddie-brewing-live-music.md",
    "noticeboard/feeds/sealink-ferry-pressure.md",
    "noticeboard/feeds/starfish-studio-artist-window.md",
    "noticeboard/feeds/shared-table-produce-callout.md"
  ],
  "deviceManifests": [
    "noticeboard/devices/plfc-wall-installation.md",
    "noticeboard/devices/dunwich-ferry-kiosk.md"
  ],
  "themeCalendar": [
    {
      "id": "world-wetlands-day",
      "title": "World Wetlands Day",
      "dateRule": "2 February",
      "source": "United Nations observances",
      "alignments": [
        "environment",
        "water",
        "wildlife",
        "education",
        "tourism"
      ],
      "prompt": "Good for bushcare, wildlife rescue, tours, artists, schools, cafes and visitor kiosks to share wetland care, clean-up days and gentle learning."
    },
    {
      "id": "mother-language-day",
      "title": "International Mother Language Day",
      "dateRule": "21 February",
      "source": "United Nations observances",
      "alignments": [
        "language",
        "culture",
        "education",
        "story"
      ],
      "prompt": "Only with proper permission. Useful for approved language learning, cultural respect prompts, library or museum displays and artist statements."
    },
    {
      "id": "world-water-day",
      "title": "World Water Day",
      "dateRule": "22 March",
      "source": "United Nations observances",
      "alignments": [
        "water",
        "health",
        "resilience",
        "environment"
      ],
      "prompt": "Good for refill stations, heat safety, reef and aquifer education, surf clubs, cafes and accommodation providers."
    },
    {
      "id": "creativity-and-innovation-day",
      "title": "World Creativity and Innovation Day",
      "dateRule": "21 April",
      "source": "United Nations observances",
      "alignments": [
        "art",
        "innovation",
        "youth",
        "technology"
      ],
      "prompt": "Good for artists, makers, Strange But True, Ready S.E.T., schools, workshops and local experiments."
    },
    {
      "id": "mother-earth-day",
      "title": "International Mother Earth Day",
      "dateRule": "22 April",
      "source": "United Nations observances",
      "alignments": [
        "environment",
        "country",
        "regeneration",
        "climate"
      ],
      "prompt": "Good for conservation work, respectful visitor behaviour, low-impact tourism, local art and food system prompts."
    },
    {
      "id": "world-bee-day",
      "title": "World Bee Day",
      "dateRule": "20 May",
      "source": "United Nations observances",
      "alignments": [
        "pollinators",
        "food",
        "gardens",
        "art"
      ],
      "prompt": "Good for Phillip and Theresa Bowman, shared table produce, gardens, cafes, schools and market displays."
    },
    {
      "id": "world-environment-day",
      "title": "World Environment Day",
      "dateRule": "5 June",
      "source": "United Nations observances",
      "alignments": [
        "environment",
        "volunteering",
        "wildlife",
        "waste"
      ],
      "prompt": "Good for FOSI, SIMO, Bushcare, Wildcare, venues, visitor screens and sponsor clean-up drives."
    },
    {
      "id": "msme-day",
      "title": "Micro-, Small and Medium-sized Enterprises Day",
      "dateRule": "27 June",
      "source": "United Nations observances",
      "alignments": [
        "small-business",
        "training",
        "co-op",
        "local-economy"
      ],
      "prompt": "Good for Straddie Chamber, local trades, artists, shops, Ready S.E.T. co-op and business support screens."
    },
    {
      "id": "indigenous-peoples-day",
      "title": "International Day of the World's Indigenous Peoples",
      "dateRule": "9 August",
      "source": "United Nations observances",
      "alignments": [
        "culture",
        "country",
        "language",
        "sovereignty"
      ],
      "prompt": "Permission-first only. Useful for approved public programs, cultural respect prompts and links to official custodial sources."
    },
    {
      "id": "world-tourism-day",
      "title": "World Tourism Day",
      "dateRule": "27 September",
      "source": "United Nations observances",
      "alignments": [
        "tourism",
        "visitor-care",
        "transport",
        "local-business"
      ],
      "prompt": "Good for tours, accommodation, ferry kiosks, hospitality, markets and visitor behaviour campaigns."
    },
    {
      "id": "world-food-day",
      "title": "World Food Day",
      "dateRule": "16 October",
      "source": "United Nations observances",
      "alignments": [
        "food",
        "shared-table",
        "local-produce",
        "health"
      ],
      "prompt": "Good for Shared Table, seafood, grocery, cafes, food sovereignty art and community meal notices."
    },
    {
      "id": "science-day",
      "title": "World Science Day for Peace and Development",
      "dateRule": "10 November",
      "source": "United Nations observances",
      "alignments": [
        "science",
        "resilience",
        "education",
        "technology"
      ],
      "prompt": "Good for kiosks, schools, disaster resilience, environmental monitoring and AI literacy workshops."
    }
  ],
  "localThemePrompts": [
    {
      "id": "whale-season",
      "title": "Whale season",
      "cadence": "seasonal",
      "alignments": [
        "tourism",
        "wildlife",
        "hospitality",
        "art"
      ],
      "prompt": "Tours, cafes, galleries, accommodation and kiosks can rotate whale-safe visitor messages and local offers."
    },
    {
      "id": "storm-and-fire-ready",
      "title": "Storm and fire ready",
      "cadence": "quarterly / seasonal",
      "alignments": [
        "safety",
        "resilience",
        "hardware",
        "volunteers"
      ],
      "prompt": "Rural fire, marine rescue, hardware, grocery, pharmacy and kiosks can coordinate prep reminders."
    },
    {
      "id": "junior-sport-week",
      "title": "Junior sport week",
      "cadence": "local calendar",
      "alignments": [
        "sport",
        "youth",
        "clubs",
        "families"
      ],
      "prompt": "Clubs can publish fixtures, training, volunteer rosters and sponsor thanks."
    },
    {
      "id": "straddie-arts-trail-window",
      "title": "Arts trail window",
      "cadence": "annual / event-led",
      "alignments": [
        "art",
        "tourism",
        "markets",
        "workshops"
      ],
      "prompt": "Artists can publish studio hours, maps, workshops, accessibility notes and available works."
    },
    {
      "id": "shared-table-week",
      "title": "Shared Table week",
      "cadence": "monthly or quarterly",
      "alignments": [
        "food",
        "care",
        "volunteering",
        "local-produce"
      ],
      "prompt": "Food providers, gardens, volunteers and venues can publish produce needs, meal times and kitchen rosters."
    },
    {
      "id": "low-waste-island",
      "title": "Low-waste island",
      "cadence": "monthly",
      "alignments": [
        "environment",
        "retail",
        "hospitality",
        "events"
      ],
      "prompt": "Shops, markets and events can show refill, reuse, repair and clean-up options."
    }
  ],
  "agentPipelines": [
    {
      "id": "ready-set-media-intake",
      "name": "Ready S.E.T. media intake agent",
      "role": "Turns approved community updates into draft markdown notices, short captions, kiosk-safe copy and questions for missing data.",
      "inputs": [
        "voice note",
        "email",
        "photo folder",
        "event flyer",
        "business update"
      ],
      "outputs": [
        "draft .md notice",
        "approval checklist",
        "screen target suggestions",
        "missing-data questions"
      ]
    },
    {
      "id": "privacy-release-gate",
      "name": "Privacy and consent gate agent",
      "role": "Checks whether the notice contains private records, exact location risk, unapproved photos, cultural claims or out-of-date information.",
      "inputs": [
        "draft .md notice",
        "publisher profile",
        "asset list"
      ],
      "outputs": [
        "approved / needs review flag",
        "redaction notes",
        "expiry date check"
      ]
    },
    {
      "id": "device-render-agent",
      "name": "Device render agent",
      "role": "Matches a notice to device shape, local asset cache, theme pack and fallback mode.",
      "inputs": [
        "approved .md notice",
        "device manifest",
        "local assets"
      ],
      "outputs": [
        "wall tile",
        "portrait kiosk card",
        "phone story",
        "text-only fallback"
      ]
    }
  ],
  "deviceLocations": [
    {
      "id": "plfc-wall-01",
      "label": "PLFC wall installation",
      "place": "Point Lookout",
      "shape": "custom wide wall",
      "role": "club results, events, sponsor thanks, safety notes"
    },
    {
      "id": "dunwich-ferry-kiosk-01",
      "label": "Dunwich ferry kiosk",
      "place": "Dunwich",
      "shape": "portrait public kiosk",
      "role": "transport, visitor guidance, emergency fallback"
    },
    {
      "id": "amity-community-screen-01",
      "label": "Amity community screen",
      "place": "Amity Point",
      "shape": "shopfront or community hall screen",
      "role": "local notices, fishing, cricket, erosion and events"
    },
    {
      "id": "point-lookout-counter-01",
      "label": "Point Lookout counter tablet",
      "place": "Point Lookout",
      "shape": "small tablet",
      "role": "QR handoff, specials, today-only notices"
    },
    {
      "id": "ready-set-media-desk-01",
      "label": "Ready S.E.T. media desk",
      "place": "mobile / co-op",
      "shape": "publisher workstation",
      "role": "drafting, approval, scheduling, asset packaging"
    }
  ]
};
