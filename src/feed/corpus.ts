/**
 * ============================================================================
 * PLACEHOLDER COPY — the `writer` lane replaces this file wholesale.
 * ============================================================================
 *
 * Every handle, caption and sound line below is a stand-in (FR-005, SC-007).
 * The markers are deliberate and must survive until `writer` joins:
 *
 *   handle   `@placeholder.<something>`
 *   caption  starts with `[PLACEHOLDER]`
 *   sound    starts with `PLACEHOLDER audio ·`
 *
 * Nothing downstream may depend on the *content* of this file, only on the
 * `PostTemplate` shape. `writer` may replace every string, add or remove
 * templates, and retag freely; the generator reads the pool at runtime.
 *
 * Two hard rules that outlive the placeholder text (Constitution I):
 *   - No real platform, company, brand, restaurant or product name.
 *   - No real person, likeness, handle, or reproduced text. Categorically.
 *
 * `artId` is a key into the art registry in `src/assets/index.ts`, owned by
 * `graphics`. An artId with no registered component renders the neutral
 * stand-in field instead, which is a supported state (FR-003, Story 4
 * scenario 3) — not a bug.
 */

import type { ArtId } from '../assets/index';
import type { Tag } from './types';

export interface PostTemplate {
  artId: ArtId;
  /** At least one; tags[0] is primary. */
  tags: Tag[];
  handle: string;
  caption: string;
  sound: string;
  /** Inflated social proof. Set data, never a running total. */
  baseLikes: number;
  sponsored: boolean;
}

export const CORPUS: readonly PostTemplate[] = [
  // ------------------------------------------------------------- noodles
  {
    artId: 'noodle-tower',
    tags: ['noodles'],
    handle: '@placeholder.wokgoblin',
    caption:
      '[PLACEHOLDER] I stacked 400 noodles into one bowl and my landlord has classified it as a structure. 99% of you will scroll past this.',
    sound: 'PLACEHOLDER audio · Slurp Theory — Kitchen Static',
    baseLikes: 2_400_000,
    sponsored: false,
  },
  {
    artId: 'midnight-broth',
    tags: ['noodles', 'cursed'],
    handle: '@placeholder.brothhours',
    caption:
      '[PLACEHOLDER] Day 61 of eating noodles at 3am until somebody stops me. Nobody has stopped me. The feed keeps saying "again".',
    sound: 'PLACEHOLDER audio · 3AM Kettle — Loop Unit',
    baseLikes: 881_000,
    sponsored: false,
  },
  {
    artId: 'seasoning-packet',
    tags: ['noodles'],
    handle: '@placeholder.packetlore',
    caption:
      '[PLACEHOLDER] The seasoning packet has a message on the back. Do not read it backwards. Part 1 of 47.',
    sound: 'PLACEHOLDER audio · Foil Crinkle — Unnamed Trio',
    baseLikes: 1_120_000,
    sponsored: false,
  },
  {
    artId: 'noodle-pull',
    tags: ['noodles'],
    handle: '@placeholder.longpull',
    caption:
      '[PLACEHOLDER] One noodle. One pull. Forty seconds. Do not blink or you will have to watch it again, which is honestly the plan.',
    sound: 'PLACEHOLDER audio · Tension Hold — Sixteen Bars',
    baseLikes: 6_700_000,
    sponsored: false,
  },
  {
    artId: 'cold-noodles',
    tags: ['noodles', 'healthy'],
    handle: '@placeholder.fridgeraid',
    caption:
      '[PLACEHOLDER] Cold noodles straight from the fridge at a temperature doctors describe as "a choice". Comment SPOON and I will do it again.',
    sound: 'PLACEHOLDER audio · Fridge Hum in C — Ambient Dept',
    baseLikes: 452_000,
    sponsored: false,
  },
  {
    artId: 'noodle-soup',
    tags: ['noodles'],
    handle: '@placeholder.bowlmaximal',
    caption:
      '[PLACEHOLDER] POV: the bowl is bigger than your head and the feed has decided this is your entire personality now.',
    sound: 'PLACEHOLDER audio · Steam Rising — Two Pots',
    baseLikes: 3_050_000,
    sponsored: false,
  },

  // -------------------------------------------------------------- cheese
  {
    artId: 'cheese-pull',
    tags: ['cheese'],
    handle: '@placeholder.stretchgoals',
    caption:
      '[PLACEHOLDER] The cheese pull reached the ceiling and the ceiling is now part of dinner. Nobody in my house is speaking to me.',
    sound: 'PLACEHOLDER audio · Elastic — Melt Section',
    baseLikes: 8_900_000,
    sponsored: false,
  },
  {
    artId: 'grilled-sandwich',
    tags: ['cheese'],
    handle: '@placeholder.panwitness',
    caption:
      '[PLACEHOLDER] I made the sandwich with four cheeses because three cheeses is for people who are fine.',
    sound: 'PLACEHOLDER audio · Butter Sizzle — Skillet Choir',
    baseLikes: 1_990_000,
    sponsored: false,
  },
  {
    artId: 'cheese-wheel',
    tags: ['cheese', 'meat'],
    handle: '@placeholder.wheelguy',
    caption:
      '[PLACEHOLDER] Scraped the entire inside of a cheese wheel with a spoon. My doctor has asked me to stop tagging her.',
    sound: 'PLACEHOLDER audio · Wheel Turn — Dairy Corps',
    baseLikes: 5_400_000,
    sponsored: false,
  },
  {
    artId: 'fondue-pit',
    tags: ['cheese'],
    handle: '@placeholder.dipcult',
    caption:
      '[PLACEHOLDER] We are dipping everything in the pot tonight. Everything. The remote is already in there. Do not scroll.',
    sound: 'PLACEHOLDER audio · Bubble Pot — Slow Warm',
    baseLikes: 730_000,
    sponsored: false,
  },
  {
    artId: 'cheese-toast-stack',
    tags: ['cheese', 'breakfast'],
    handle: '@placeholder.toastdept',
    caption:
      '[PLACEHOLDER] Eleven layers of toast and cheese. I have named it. I will not be telling you the name in this video.',
    sound: 'PLACEHOLDER audio · Crunch Ladder — Grill Unit',
    baseLikes: 2_260_000,
    sponsored: false,
  },
  {
    artId: 'cheese-crisp',
    tags: ['cheese'],
    handle: '@placeholder.lacefry',
    caption:
      '[PLACEHOLDER] Fried the cheese until it became a crisp, then ate the crisp in one motion. The algorithm has been informed.',
    sound: 'PLACEHOLDER audio · Snap Lace — Pan Committee',
    baseLikes: 1_010_000,
    sponsored: false,
  },

  // ------------------------------------------------------------- dessert
  {
    artId: 'cake-slice',
    tags: ['dessert'],
    handle: '@placeholder.layercount',
    caption:
      '[PLACEHOLDER] Twelve layers. Count them with me. If you lose count you have to start the video again, those are the rules I invented.',
    sound: 'PLACEHOLDER audio · Sugar Tempo — Whisk Ensemble',
    baseLikes: 4_120_000,
    sponsored: false,
  },
  {
    artId: 'molten-centre',
    tags: ['dessert'],
    handle: '@placeholder.oozecam',
    caption:
      '[PLACEHOLDER] The centre came out molten and I have watched this clip 200 times. You are about to watch it twice.',
    sound: 'PLACEHOLDER audio · Slow Flow — Spoon Quartet',
    baseLikes: 9_600_000,
    sponsored: false,
  },
  {
    artId: 'sprinkle-storm',
    tags: ['dessert'],
    handle: '@placeholder.sprinklecrime',
    caption:
      '[PLACEHOLDER] I used the entire jar of sprinkles. There is no going back. There is only more sprinkles, forever, scrolling.',
    sound: 'PLACEHOLDER audio · Rain of Sugar — Jar Sessions',
    baseLikes: 620_000,
    sponsored: false,
  },
  {
    artId: 'donut-glaze',
    tags: ['dessert', 'breakfast'],
    handle: '@placeholder.glazeloop',
    caption:
      '[PLACEHOLDER] Glaze going on in slow motion. This is a loop. You have been here for four minutes. Everything is fine.',
    sound: 'PLACEHOLDER audio · Drip Cycle — Glaze Lab',
    baseLikes: 3_780_000,
    sponsored: false,
  },
  {
    artId: 'ice-cream-tower',
    tags: ['dessert'],
    handle: '@placeholder.nineteenscoops',
    caption:
      '[PLACEHOLDER] Nineteen scoops in one cone. It fell over at second 28 and that is why this has more views than my wedding.',
    sound: 'PLACEHOLDER audio · Tall Order — Cone Division',
    baseLikes: 12_400_000,
    sponsored: false,
  },
  {
    artId: 'candy-shell',
    tags: ['dessert', 'cursed'],
    handle: '@placeholder.shellcrack',
    caption:
      '[PLACEHOLDER] Cracking the shell with a tiny hammer for the 90th day running. Nobody has asked me to do this.',
    sound: 'PLACEHOLDER audio · Small Hammer — Percussive Dept',
    baseLikes: 2_870_000,
    sponsored: false,
  },

  // -------------------------------------------------------------- cursed
  {
    artId: 'blue-spaghetti',
    tags: ['cursed', 'noodles'],
    handle: '@placeholder.wrongcolour',
    caption:
      '[PLACEHOLDER] I dyed the pasta a colour pasta has never been. Taste unaffected. Everything else affected.',
    sound: 'PLACEHOLDER audio · Unnatural Hue — Vat Six',
    baseLikes: 7_300_000,
    sponsored: false,
  },
  {
    artId: 'gravy-dessert',
    tags: ['cursed', 'dessert'],
    handle: '@placeholder.wronggravy',
    caption:
      '[PLACEHOLDER] Gravy on the ice cream. I did not want to. The comments made me. This is your fault specifically.',
    sound: 'PLACEHOLDER audio · Regret Pour — Ladle Trio',
    baseLikes: 5_050_000,
    sponsored: false,
  },
  {
    artId: 'pickle-jar-drink',
    tags: ['cursed', 'drink'],
    handle: '@placeholder.brinefirst',
    caption:
      '[PLACEHOLDER] Drinking the jar liquid. Just the liquid. It is 6am. The feed served this to you on purpose.',
    sound: 'PLACEHOLDER audio · Jar Gulp — Brine Ensemble',
    baseLikes: 1_640_000,
    sponsored: false,
  },
  {
    artId: 'microwave-experiment',
    tags: ['cursed'],
    handle: '@placeholder.ninetysecs',
    caption:
      '[PLACEHOLDER] Ninety seconds on high and it changed shape in a way that I think is against physics. Part 3 of 3. There are 40 parts.',
    sound: 'PLACEHOLDER audio · Turntable Hum — Appliance Works',
    baseLikes: 3_310_000,
    sponsored: false,
  },
  {
    artId: 'entire-lemon',
    tags: ['cursed', 'healthy'],
    handle: '@placeholder.peelincluded',
    caption:
      '[PLACEHOLDER] Eating it whole, peel included, while maintaining eye contact with the camera the entire time. Do not look away first.',
    sound: 'PLACEHOLDER audio · Sour Face — One Take',
    baseLikes: 8_050_000,
    sponsored: false,
  },
  {
    artId: 'butter-block',
    tags: ['cursed'],
    handle: '@placeholder.blockonly',
    caption:
      '[PLACEHOLDER] It is just the block. There is no recipe. There was never going to be a recipe. Stay for the end.',
    sound: 'PLACEHOLDER audio · Solid Fat — Ambient Dairy',
    baseLikes: 4_490_000,
    sponsored: false,
  },

  // ------------------------------------------------------------- healthy
  {
    artId: 'salad-bowl',
    tags: ['healthy'],
    handle: '@placeholder.leafquota',
    caption:
      '[PLACEHOLDER] The bowl contains 31 ingredients and one of them is regret. Save this for a day you will never have.',
    sound: 'PLACEHOLDER audio · Crunch Meditation — Leaf Section',
    baseLikes: 940_000,
    sponsored: false,
  },
  {
    artId: 'green-smoothie',
    tags: ['healthy', 'drink'],
    handle: '@placeholder.blendcycle',
    caption:
      '[PLACEHOLDER] Day 1 of drinking this until I become a different person. Following for the transformation is not optional, I have checked.',
    sound: 'PLACEHOLDER audio · Blender at Dawn — Motor Ensemble',
    baseLikes: 1_380_000,
    sponsored: true,
  },
  {
    artId: 'grain-bowl',
    tags: ['healthy'],
    handle: '@placeholder.macrostack',
    caption:
      '[PLACEHOLDER] Meal prepped 14 identical containers. They are identical. I will eat them in an order I have not decided yet.',
    sound: 'PLACEHOLDER audio · Container Snap — Prep Unit',
    baseLikes: 510_000,
    sponsored: false,
  },
  {
    artId: 'avocado-fan',
    tags: ['healthy', 'breakfast'],
    handle: '@placeholder.fanangle',
    caption:
      '[PLACEHOLDER] The fan angle took 40 minutes. The eating took 9 seconds. The video took your whole afternoon.',
    sound: 'PLACEHOLDER audio · Knife Whisper — Board Section',
    baseLikes: 2_050_000,
    sponsored: false,
  },
  {
    artId: 'rainbow-veg',
    tags: ['healthy'],
    handle: '@placeholder.chopdept',
    caption:
      '[PLACEHOLDER] Chopping every vegetable in the fridge into the same size cube. Satisfying. Pointless. Unstoppable. Like this feed.',
    sound: 'PLACEHOLDER audio · Even Cubes — Rhythm Board',
    baseLikes: 6_120_000,
    sponsored: false,
  },
  {
    artId: 'soup-pot-green',
    tags: ['healthy'],
    handle: '@placeholder.potofgreen',
    caption:
      '[PLACEHOLDER] One pot. Eight days of lunch. Zero enthusiasm. Nine million people watched this, which says more about them.',
    sound: 'PLACEHOLDER audio · Simmer Long — Stock Quartet',
    baseLikes: 9_100_000,
    sponsored: false,
  },

  // ---------------------------------------------------------------- meat
  {
    artId: 'grill-flip',
    tags: ['meat'],
    handle: '@placeholder.flipangle',
    caption:
      '[PLACEHOLDER] The flip at 0:04 is the only reason this exists. Everything before it is pacing. Everything after it is pacing.',
    sound: 'PLACEHOLDER audio · Grill Roar — Flame Section',
    baseLikes: 5_880_000,
    sponsored: false,
  },
  {
    artId: 'smoked-rack',
    tags: ['meat'],
    handle: '@placeholder.fourteenhours',
    caption:
      '[PLACEHOLDER] Fourteen hours of smoke for a clip that lasts eleven seconds. Efficiency has left the building and so has my family.',
    sound: 'PLACEHOLDER audio · Long Smoke — Barrel Choir',
    baseLikes: 3_670_000,
    sponsored: false,
  },
  {
    artId: 'burger-stack',
    tags: ['meat', 'cheese'],
    handle: '@placeholder.patrycount',
    caption:
      '[PLACEHOLDER] Seven patties. I could not close my mouth around it, which is not a failure, it is content.',
    sound: 'PLACEHOLDER audio · Stack Collapse — Bun Division',
    baseLikes: 11_200_000,
    sponsored: false,
  },
  {
    artId: 'skewer-line',
    tags: ['meat'],
    handle: '@placeholder.skewerrow',
    caption:
      '[PLACEHOLDER] Forty skewers in one line, turned at the same moment. This is the most organised I will ever be.',
    sound: 'PLACEHOLDER audio · Turn Together — Coal Unit',
    baseLikes: 1_450_000,
    sponsored: false,
  },
  {
    artId: 'meat-slice-fan',
    tags: ['meat'],
    handle: '@placeholder.restingtime',
    caption:
      '[PLACEHOLDER] Rested it for the correct number of minutes and the comments are still arguing about the correct number of minutes.',
    sound: 'PLACEHOLDER audio · Slow Slice — Board Section',
    baseLikes: 4_030_000,
    sponsored: false,
  },
  {
    artId: 'sauce-drizzle',
    tags: ['meat'],
    handle: '@placeholder.finalpour',
    caption:
      '[PLACEHOLDER] The final pour happens at the very last second so the loop starts again before you can leave. Sorry. Not sorry.',
    sound: 'PLACEHOLDER audio · Last Second — Pan Sauce Co.',
    baseLikes: 7_940_000,
    sponsored: false,
  },

  // --------------------------------------------------------------- drink
  {
    artId: 'layered-drink',
    tags: ['drink'],
    handle: '@placeholder.sixlayers',
    caption:
      '[PLACEHOLDER] Six layers that do not mix, held apart by a principle I do not understand. Stirring it would end the video.',
    sound: 'PLACEHOLDER audio · Density Test — Glass Section',
    baseLikes: 2_610_000,
    sponsored: false,
  },
  {
    artId: 'bubble-cup',
    tags: ['drink'],
    handle: '@placeholder.pearlcount',
    caption:
      '[PLACEHOLDER] I asked for extra pearls and they gave me a cup that is legally a bowl. Rate it out of ten in the comments.',
    sound: 'PLACEHOLDER audio · Straw Punch — Cup Works',
    baseLikes: 5_230_000,
    sponsored: true,
  },
  {
    artId: 'coffee-pour',
    tags: ['drink', 'breakfast'],
    handle: '@placeholder.slowpour',
    caption:
      '[PLACEHOLDER] The pour takes 45 seconds. I have nothing else to offer you. It is working though, isn’t it.',
    sound: 'PLACEHOLDER audio · Pour Over — Kettle Quartet',
    baseLikes: 1_770_000,
    sponsored: false,
  },
  {
    artId: 'ice-crackle',
    tags: ['drink'],
    handle: '@placeholder.cracklecam',
    caption:
      '[PLACEHOLDER] Turn the sound up for the ice. That is the whole thing. That is the entire post. It has nine million likes.',
    sound: 'PLACEHOLDER audio · Crackle Close — Mic on Glass',
    baseLikes: 9_020_000,
    sponsored: false,
  },
  {
    artId: 'fruit-shake',
    tags: ['drink', 'dessert'],
    handle: '@placeholder.overthetop',
    caption:
      '[PLACEHOLDER] There is a whole slice of cake on top of the drink. The drink is now a dessert. The dessert is now a structural problem.',
    sound: 'PLACEHOLDER audio · Too Much — Topping Dept',
    baseLikes: 6_450_000,
    sponsored: false,
  },
  {
    artId: 'soda-fizz',
    tags: ['drink'],
    handle: '@placeholder.fizzframe',
    caption:
      '[PLACEHOLDER] Filmed the fizz at 960 frames a second so you would stay. You stayed. We both know what happened here.',
    sound: 'PLACEHOLDER audio · Slow Fizz — High Frame Unit',
    baseLikes: 3_190_000,
    sponsored: false,
  },

  // ----------------------------------------------------------- breakfast
  {
    artId: 'pancake-stack',
    tags: ['breakfast'],
    handle: '@placeholder.stackdept',
    caption:
      '[PLACEHOLDER] Eighteen pancakes. The syrup takes nine seconds to reach the bottom and I filmed all nine of them.',
    sound: 'PLACEHOLDER audio · Syrup Descent — Griddle Choir',
    baseLikes: 4_760_000,
    sponsored: false,
  },
  {
    artId: 'egg-flip',
    tags: ['breakfast'],
    handle: '@placeholder.onepan',
    caption:
      '[PLACEHOLDER] Flipped it without a spatula on the 41st attempt. The first 40 attempts are on my profile. Go. Now.',
    sound: 'PLACEHOLDER audio · Pan Toss — Morning Unit',
    baseLikes: 2_330_000,
    sponsored: false,
  },
  {
    artId: 'toast-butter',
    tags: ['breakfast'],
    handle: '@placeholder.spreadangle',
    caption:
      '[PLACEHOLDER] Cold butter on hot toast, which I am told is a war crime in four countries. Comment your country.',
    sound: 'PLACEHOLDER audio · Scrape — Toast Section',
    baseLikes: 880_000,
    sponsored: false,
  },
  {
    artId: 'cereal-pour',
    tags: ['breakfast'],
    handle: '@placeholder.pourorder',
    caption:
      '[PLACEHOLDER] Milk first. I said what I said. The comments are at 41,000 and the feed is very pleased with itself.',
    sound: 'PLACEHOLDER audio · Pour Debate — Bowl Committee',
    baseLikes: 7_100_000,
    sponsored: false,
  },
  {
    artId: 'breakfast-tray',
    tags: ['breakfast', 'healthy'],
    handle: '@placeholder.traylife',
    caption:
      '[PLACEHOLDER] Everything on one tray, arranged for a camera and not for a person. Nobody ate this. It went in the bin at 9:15.',
    sound: 'PLACEHOLDER audio · Tray Set — Flatlay Dept',
    baseLikes: 1_260_000,
    sponsored: true,
  },
  {
    artId: 'waffle-grid',
    tags: ['breakfast', 'dessert'],
    handle: '@placeholder.gridfill',
    caption:
      '[PLACEHOLDER] Filling every single square individually with a tiny spoon. It took 26 minutes. You will watch all of it.',
    sound: 'PLACEHOLDER audio · Square by Square — Iron Works',
    baseLikes: 10_400_000,
    sponsored: false,
  },
];
