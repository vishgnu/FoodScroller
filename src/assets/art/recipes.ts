/**
 * The 81 recipes.
 *
 * One row per artId in `src/feed/corpus.ts`. A row is a combination, not a
 * drawing: a background field treatment and tone, a vessel, a food form, one
 * or two garnishes, and a palette pair-plus-accent drawn from the eight
 * tokens. The composer in `Composition.tsx` turns a row into an SVG.
 *
 * Why a table and not 81 files: the feed guarantees no artId repeats inside
 * 20 posts, and that guarantee is only worth something if no two artIds
 * *look* alike. A table makes the whole set inspectable at once — every
 * column can be scanned for collisions, which is the check 81 separate
 * files would not survive.
 *
 * `cursed` rows carry a `ghost`: the same subject printed once out of
 * register underneath itself. That is the joke, and it is the one place the
 * composition is allowed to look wrong.
 */

import type { Tag } from '../../feed/types';
import type { FieldName } from './fields';
import type { FormName } from './forms';
import type { GarnishName } from './garnish';
import type { Token } from './tokens';
import type { VesselName } from './vessels';

export interface Recipe {
  id: string;
  tags: Tag[];
  /** Layer one. */
  base: Token;
  field: FieldName;
  tone: Token;
  /** Layer two. */
  vessel: VesselName;
  form: FormName;
  garnish: readonly [GarnishName, GarnishName];
  /** The palette pair, plus the one accent that pops. */
  food: Token;
  vesselColour: Token;
  accent: Token;
  /** Set only on `cursed` rows. */
  ghost?: Token;
  cursed?: true;
  /** Subject placement, within the box that clears the caption and rail. */
  scale?: number;
  dx?: number;
  dy?: number;
  tilt?: number;
}

export const RECIPES: readonly Recipe[] = [
  /* ------------------------------------------------------------- noodles */
  { id: 'noodle-tower', tags: ['noodles'], base: 'void', field: 'rays', tone: 'zest', vessel: 'bowl', form: 'noodleTower', garnish: ['steam', 'sparkle'], food: 'zest', vesselColour: 'grape', accent: 'mint' },
  { id: 'midnight-broth', tags: ['noodles', 'cursed'], base: 'void', field: 'speckle', tone: 'grape', vessel: 'deepBowl', form: 'brothStrands', garnish: ['swarm', 'steam'], food: 'muted', vesselColour: 'grape', accent: 'mint', ghost: 'grape', cursed: true, tilt: -4 },
  { id: 'seasoning-packet', tags: ['noodles'], base: 'surface', field: 'dots', tone: 'zest', vessel: 'wideBowl', form: 'seasoningPacket', garnish: ['crumbs', 'none'], food: 'zest', vesselColour: 'muted', accent: 'ink' },
  { id: 'noodle-pull', tags: ['noodles'], base: 'void', field: 'halo', tone: 'mint', vessel: 'bowl', form: 'noodlePull', garnish: ['chopsticks', 'steam'], food: 'zest', vesselColour: 'mint', accent: 'ink' },
  { id: 'cold-noodles', tags: ['noodles', 'healthy'], base: 'surface', field: 'grid', tone: 'mint', vessel: 'plate', form: 'noodleNest', garnish: ['ice', 'herb'], food: 'ink', vesselColour: 'mint', accent: 'mint', dy: -30 },
  { id: 'noodle-soup', tags: ['noodles'], base: 'void', field: 'heat', tone: 'zest', vessel: 'wideBowl', form: 'brothStrands', garnish: ['scallion', 'steam'], food: 'zest', vesselColour: 'muted', accent: 'mint' },
  { id: 'cheesy-noodle-bake', tags: ['noodles', 'cheese'], base: 'surface', field: 'band', tone: 'zest', vessel: 'tray', form: 'noodleBlanket', garnish: ['melt', 'none'], food: 'muted', vesselColour: 'muted', accent: 'zest' },
  { id: 'meaty-noodle-bowl', tags: ['noodles', 'meat'], base: 'void', field: 'arcs', tone: 'muted', vessel: 'bowl', form: 'noodleTubes', garnish: ['herb', 'none'], food: 'muted', vesselColour: 'mint', accent: 'zest' },
  { id: 'noodle-in-bread', tags: ['noodles', 'cursed'], base: 'surface', field: 'speckle', tone: 'muted', vessel: 'none', form: 'loafBowl', garnish: ['steam', 'swarm'], food: 'zest', vesselColour: 'muted', accent: 'muted', ghost: 'grape', cursed: true, tilt: 3 },
  { id: 'noodle-broth-cup', tags: ['noodles', 'drink'], base: 'void', field: 'stripes', tone: 'zest', vessel: 'cupLid', form: 'brothStrands', garnish: ['straw', 'steam'], food: 'zest', vesselColour: 'ink', accent: 'mint', scale: 0.88, dy: -20 },
  { id: 'sweet-noodle-dessert', tags: ['noodles', 'dessert'], base: 'surface', field: 'confetti', tone: 'grape', vessel: 'plate', form: 'noodleMound', garnish: ['drizzle', 'cherry'], food: 'ink', vesselColour: 'grape', accent: 'grape', scale: 0.9, dy: -20 },
  { id: 'noodle-nest', tags: ['noodles'], base: 'void', field: 'wedge', tone: 'muted', vessel: 'board', form: 'noodleNest', garnish: ['crumbs', 'none'], food: 'zest', vesselColour: 'muted', accent: 'ink', tilt: -4 },
  { id: 'noodle-scissors', tags: ['noodles'], base: 'surface', field: 'spot', tone: 'mint', vessel: 'wideBowl', form: 'scissorsCut', garnish: ['steam', 'none'], food: 'zest', vesselColour: 'mint', accent: 'ink' },

  /* -------------------------------------------------------------- cheese */
  { id: 'cheese-pull', tags: ['cheese'], base: 'void', field: 'rays', tone: 'zest', vessel: 'none', form: 'cheeseStretch', garnish: ['sparkle', 'none'], food: 'muted', vesselColour: 'muted', accent: 'zest' },
  { id: 'grilled-sandwich', tags: ['cheese'], base: 'surface', field: 'dots', tone: 'zest', vessel: 'plate', form: 'sandwichTriangles', garnish: ['crumbs', 'none'], food: 'zest', vesselColour: 'muted', accent: 'ink', dy: -30 },
  { id: 'cheese-wheel', tags: ['cheese', 'meat'], base: 'void', field: 'halo', tone: 'zest', vessel: 'board', form: 'cheeseWheel', garnish: ['knifeFork', 'none'], food: 'muted', vesselColour: 'muted', accent: 'zest', scale: 0.9, dy: -20 },
  { id: 'fondue-pit', tags: ['cheese'], base: 'void', field: 'heat', tone: 'zest', vessel: 'pot', form: 'moltenPool', garnish: ['fork', 'steam'], food: 'zest', vesselColour: 'muted', accent: 'ink' },
  { id: 'cheese-toast-stack', tags: ['cheese', 'breakfast'], base: 'surface', field: 'grid', tone: 'zest', vessel: 'plate', form: 'toastStack', garnish: ['melt', 'none'], food: 'zest', vesselColour: 'muted', accent: 'muted', dy: -40 },
  { id: 'cheese-crisp', tags: ['cheese'], base: 'void', field: 'arcs', tone: 'zest', vessel: 'plate', form: 'cheeseCrisp', garnish: ['crumbs', 'none'], food: 'zest', vesselColour: 'muted', accent: 'ink', scale: 0.94 },
  { id: 'cheese-stuffed-patty', tags: ['cheese', 'meat'], base: 'surface', field: 'band', tone: 'muted', vessel: 'plate', form: 'cheeseBurst', garnish: ['steam', 'none'], food: 'zest', vesselColour: 'muted', accent: 'muted', dy: -30 },
  { id: 'cheese-in-cereal', tags: ['cheese', 'cursed'], base: 'void', field: 'speckle', tone: 'grape', vessel: 'wideBowl', form: 'cheeseCubes', garnish: ['swarm', 'none'], food: 'zest', vesselColour: 'muted', accent: 'grape', ghost: 'grape', cursed: true, tilt: 4 },
  { id: 'cheese-milkshake', tags: ['cheese', 'drink'], base: 'surface', field: 'stripes', tone: 'zest', vessel: 'glassTall', form: 'swirlTop', garnish: ['straw', 'sparkle'], food: 'zest', vesselColour: 'ink', accent: 'ink' },
  { id: 'cheese-on-greens', tags: ['cheese', 'healthy'], base: 'void', field: 'halo', tone: 'mint', vessel: 'plate', form: 'leafPile', garnish: ['sprinkles', 'fork'], food: 'mint', vesselColour: 'muted', accent: 'zest', scale: 0.92, dy: -40 },
  { id: 'cheese-grate-wall', tags: ['cheese'], base: 'surface', field: 'wedge', tone: 'muted', vessel: 'none', form: 'grateShreds', garnish: ['none', 'none'], food: 'zest', vesselColour: 'muted', accent: 'muted' },
  { id: 'cheese-board-spiral', tags: ['cheese'], base: 'void', field: 'confetti', tone: 'zest', vessel: 'board', form: 'cheeseWedges', garnish: ['crumbs', 'herb'], food: 'zest', vesselColour: 'muted', accent: 'mint', dy: -30 },

  /* ------------------------------------------------------------- dessert */
  { id: 'cake-slice', tags: ['dessert'], base: 'surface', field: 'rays', tone: 'grape', vessel: 'plate', form: 'cakeSlice', garnish: ['cherry', 'sparkle'], food: 'grape', vesselColour: 'muted', accent: 'ink', dy: -40 },
  { id: 'molten-centre', tags: ['dessert'], base: 'void', field: 'spot', tone: 'grape', vessel: 'plate', form: 'domeCake', garnish: ['drizzle', 'none'], food: 'grape', vesselColour: 'muted', accent: 'muted', dy: -30 },
  { id: 'sprinkle-storm', tags: ['dessert'], base: 'void', field: 'confetti', tone: 'zest', vessel: 'none', form: 'cupcake', garnish: ['sprinkleStorm', 'none'], food: 'ink', vesselColour: 'muted', accent: 'grape' },
  { id: 'donut-glaze', tags: ['dessert', 'breakfast'], base: 'surface', field: 'halo', tone: 'grape', vessel: 'none', form: 'donut', garnish: ['sprinkles', 'none'], food: 'grape', vesselColour: 'muted', accent: 'zest' },
  { id: 'ice-cream-tower', tags: ['dessert'], base: 'void', field: 'stripes', tone: 'mint', vessel: 'cone', form: 'scoopStack', garnish: ['cherry', 'sparkle'], food: 'mint', vesselColour: 'zest', accent: 'ink', dy: 30 },
  { id: 'candy-shell', tags: ['dessert', 'cursed'], base: 'surface', field: 'speckle', tone: 'grape', vessel: 'none', form: 'candySphere', garnish: ['swarm', 'none'], food: 'zest', vesselColour: 'grape', accent: 'grape', ghost: 'mint', cursed: true, tilt: -5 },
  { id: 'meringue-peak', tags: ['dessert'], base: 'void', field: 'arcs', tone: 'ink', vessel: 'plate', form: 'meringue', garnish: ['drizzle', 'none'], food: 'ink', vesselColour: 'muted', accent: 'zest', dy: -20 },
  { id: 'chocolate-shatter', tags: ['dessert'], base: 'void', field: 'grid', tone: 'muted', vessel: 'board', form: 'chocSlab', garnish: ['crumbs', 'none'], food: 'grape', vesselColour: 'muted', accent: 'zest', dy: -40 },

  /* -------------------------------------------------------------- cursed */
  { id: 'blue-spaghetti', tags: ['cursed', 'noodles'], base: 'void', field: 'speckle', tone: 'grape', vessel: 'bowl', form: 'noodleMound', garnish: ['chopsticks', 'swarm'], food: 'grape', vesselColour: 'muted', accent: 'grape', ghost: 'mint', cursed: true, tilt: -6 },
  { id: 'gravy-dessert', tags: ['cursed', 'dessert'], base: 'surface', field: 'band', tone: 'muted', vessel: 'sundae', form: 'oozeBlob', garnish: ['pour', 'swarm'], food: 'grape', vesselColour: 'ink', accent: 'muted', ghost: 'mint', cursed: true, dy: -60 },
  { id: 'pickle-jar-drink', tags: ['cursed', 'drink'], base: 'void', field: 'dots', tone: 'mint', vessel: 'jar', form: 'pickles', garnish: ['fatStraw', 'none'], food: 'mint', vesselColour: 'ink', accent: 'mint', ghost: 'grape', cursed: true, tilt: 3 },
  { id: 'microwave-experiment', tags: ['cursed'], base: 'void', field: 'heat', tone: 'zest', vessel: 'none', form: 'microwaveBox', garnish: ['swarm', 'none'], food: 'zest', vesselColour: 'muted', accent: 'muted', ghost: 'grape', cursed: true, tilt: -3 },
  { id: 'entire-lemon', tags: ['cursed', 'healthy'], base: 'surface', field: 'flat', tone: 'zest', vessel: 'plate', form: 'wholeLemon', garnish: ['knifeFork', 'none'], food: 'zest', vesselColour: 'muted', accent: 'ink', ghost: 'mint', cursed: true, dy: -40 },
  { id: 'butter-block', tags: ['cursed'], base: 'void', field: 'wedge', tone: 'zest', vessel: 'plate', form: 'butterBlock', garnish: ['none', 'none'], food: 'zest', vesselColour: 'muted', accent: 'ink', ghost: 'grape', cursed: true, tilt: 5, dy: -40 },
  { id: 'cursed-sundae', tags: ['cursed', 'dessert'], base: 'void', field: 'confetti', tone: 'grape', vessel: 'sundae', form: 'sundaeWrong', garnish: ['swarm', 'none'], food: 'ink', vesselColour: 'ink', accent: 'mint', ghost: 'grape', cursed: true },
  { id: 'soup-in-a-loaf', tags: ['cursed'], base: 'surface', field: 'halo', tone: 'muted', vessel: 'none', form: 'loafBowl', garnish: ['spoon', 'steam'], food: 'mint', vesselColour: 'muted', accent: 'muted', ghost: 'grape', cursed: true, tilt: -4 },
  { id: 'deep-fried-everything', tags: ['cursed'], base: 'void', field: 'rays', tone: 'zest', vessel: 'basket', form: 'friedLumps', garnish: ['crumbs', 'none'], food: 'zest', vesselColour: 'muted', accent: 'muted', ghost: 'grape', cursed: true },
  { id: 'jelly-architecture', tags: ['cursed'], base: 'void', field: 'grid', tone: 'grape', vessel: 'plate', form: 'jellyTower', garnish: ['sparkle', 'none'], food: 'grape', vesselColour: 'muted', accent: 'mint', ghost: 'mint', cursed: true, tilt: 3, dy: -30 },
  { id: 'mystery-tin', tags: ['cursed'], base: 'void', field: 'stripes', tone: 'muted', vessel: 'tin', form: 'greyMass', garnish: ['swarm', 'none'], food: 'muted', vesselColour: 'ink', accent: 'mint', ghost: 'grape', cursed: true, tilt: -3 },

  /* ------------------------------------------------------------- healthy */
  { id: 'salad-bowl', tags: ['healthy'], base: 'void', field: 'spot', tone: 'mint', vessel: 'wideBowl', form: 'leafPile', garnish: ['seeds', 'herb'], food: 'mint', vesselColour: 'muted', accent: 'zest' },
  { id: 'green-smoothie', tags: ['healthy', 'drink'], base: 'surface', field: 'stripes', tone: 'mint', vessel: 'glassTall', form: 'smoothieColumn', garnish: ['straw', 'herb'], food: 'mint', vesselColour: 'ink', accent: 'mint' },
  { id: 'grain-bowl', tags: ['healthy'], base: 'void', field: 'dots', tone: 'zest', vessel: 'wideBowl', form: 'grainQuadrants', garnish: ['seeds', 'none'], food: 'zest', vesselColour: 'mint', accent: 'mint' },
  { id: 'avocado-fan', tags: ['healthy', 'breakfast'], base: 'surface', field: 'wedge', tone: 'mint', vessel: 'board', form: 'avocadoFan', garnish: ['seeds', 'herb'], food: 'mint', vesselColour: 'muted', accent: 'zest', dy: -60 },
  { id: 'rainbow-veg', tags: ['healthy'], base: 'void', field: 'rays', tone: 'mint', vessel: 'none', form: 'vegBatons', garnish: ['none', 'none'], food: 'mint', vesselColour: 'muted', accent: 'zest', dy: -60 },
  { id: 'soup-pot-green', tags: ['healthy'], base: 'void', field: 'heat', tone: 'mint', vessel: 'pot', form: 'greenPool', garnish: ['lid', 'steam'], food: 'mint', vesselColour: 'muted', accent: 'ink' },
  { id: 'overnight-oats', tags: ['healthy', 'breakfast'], base: 'surface', field: 'grid', tone: 'ink', vessel: 'jar', form: 'oatsLayers', garnish: ['spoon', 'none'], food: 'ink', vesselColour: 'muted', accent: 'grape' },
  { id: 'sprouted-jar', tags: ['healthy'], base: 'void', field: 'arcs', tone: 'mint', vessel: 'jar', form: 'sprouts', garnish: ['none', 'none'], food: 'mint', vesselColour: 'ink', accent: 'mint', tilt: -10, dy: -30 },
  { id: 'steamed-greens', tags: ['healthy'], base: 'surface', field: 'halo', tone: 'mint', vessel: 'basket', form: 'steamedGreens', garnish: ['steam', 'none'], food: 'mint', vesselColour: 'muted', accent: 'mint' },

  /* ---------------------------------------------------------------- meat */
  { id: 'grill-flip', tags: ['meat'], base: 'void', field: 'heat', tone: 'zest', vessel: 'pan', form: 'pattyFlip', garnish: ['flame', 'none'], food: 'muted', vesselColour: 'surface', accent: 'zest' },
  { id: 'smoked-rack', tags: ['meat'], base: 'void', field: 'band', tone: 'muted', vessel: 'board', form: 'ribRack', garnish: ['bigSmoke', 'none'], food: 'muted', vesselColour: 'surface', accent: 'ink', dy: -40 },
  { id: 'burger-stack', tags: ['meat', 'cheese'], base: 'surface', field: 'rays', tone: 'zest', vessel: 'none', form: 'burgerStack', garnish: ['sparkle', 'none'], food: 'muted', vesselColour: 'ink', accent: 'zest', scale: 0.92, dy: 40 },
  { id: 'skewer-line', tags: ['meat'], base: 'void', field: 'grid', tone: 'muted', vessel: 'none', form: 'skewers', garnish: ['flame', 'none'], food: 'muted', vesselColour: 'muted', accent: 'zest', scale: 0.9 },
  { id: 'meat-slice-fan', tags: ['meat'], base: 'void', field: 'arcs', tone: 'muted', vessel: 'plate', form: 'sliceFan', garnish: ['herb', 'none'], food: 'zest', vesselColour: 'muted', accent: 'grape', dy: -40 },
  { id: 'sauce-drizzle', tags: ['meat'], base: 'void', field: 'spot', tone: 'zest', vessel: 'plate', form: 'roastGlazed', garnish: ['drizzle', 'none'], food: 'zest', vesselColour: 'muted', accent: 'grape', dy: -30 },
  { id: 'meat-and-hot-sauce', tags: ['meat', 'cursed'], base: 'void', field: 'speckle', tone: 'grape', vessel: 'pan', form: 'stripsPan', garnish: ['pour', 'swarm'], food: 'zest', vesselColour: 'surface', accent: 'grape', ghost: 'mint', cursed: true, tilt: 4 },
  { id: 'meat-broth-mug', tags: ['meat', 'drink'], base: 'void', field: 'halo', tone: 'zest', vessel: 'mug', form: 'moltenPool', garnish: ['steam', 'none'], food: 'zest', vesselColour: 'muted', accent: 'ink', dy: 20 },
  { id: 'lean-protein-plate', tags: ['meat', 'healthy'], base: 'surface', field: 'dots', tone: 'mint', vessel: 'plate', form: 'filletPlate', garnish: ['none', 'none'], food: 'ink', vesselColour: 'muted', accent: 'mint', dy: -30 },
  { id: 'rib-pull', tags: ['meat'], base: 'void', field: 'wedge', tone: 'zest', vessel: 'none', form: 'singleRib', garnish: ['flame', 'none'], food: 'zest', vesselColour: 'muted', accent: 'ink' },

  /* --------------------------------------------------------------- drink */
  { id: 'layered-drink', tags: ['drink'], base: 'void', field: 'stripes', tone: 'grape', vessel: 'glassTall', form: 'layers', garnish: ['straw', 'none'], food: 'zest', vesselColour: 'grape', accent: 'mint' },
  { id: 'bubble-cup', tags: ['drink'], base: 'surface', field: 'dots', tone: 'grape', vessel: 'glassTall', form: 'pearls', garnish: ['fatStraw', 'none'], food: 'grape', vesselColour: 'ink', accent: 'muted' },
  { id: 'coffee-pour', tags: ['drink', 'breakfast'], base: 'void', field: 'wedge', tone: 'muted', vessel: 'none', form: 'pourStream', garnish: ['steam', 'none'], food: 'muted', vesselColour: 'muted', accent: 'ink' },
  { id: 'ice-crackle', tags: ['drink'], base: 'void', field: 'arcs', tone: 'mint', vessel: 'glassShort', form: 'iceGlass', garnish: ['fizz', 'none'], food: 'mint', vesselColour: 'ink', accent: 'ink' },
  { id: 'fruit-shake', tags: ['drink', 'dessert'], base: 'surface', field: 'confetti', tone: 'grape', vessel: 'glassTall', form: 'swirlTop', garnish: ['straw', 'cherry'], food: 'grape', vesselColour: 'ink', accent: 'ink' },
  { id: 'soda-fizz', tags: ['drink'], base: 'void', field: 'halo', tone: 'mint', vessel: 'none', form: 'canFizz', garnish: ['fizz', 'sparkle'], food: 'mint', vesselColour: 'ink', accent: 'ink' },
  { id: 'dessert-float', tags: ['drink', 'dessert'], base: 'surface', field: 'spot', tone: 'grape', vessel: 'glassShort', form: 'float', garnish: ['fizz', 'cherry'], food: 'grape', vesselColour: 'ink', accent: 'ink' },
  { id: 'iced-tea-tower', tags: ['drink'], base: 'void', field: 'grid', tone: 'zest', vessel: 'glassTall', form: 'teaTower', garnish: ['straw', 'ice'], food: 'muted', vesselColour: 'ink', accent: 'zest' },
  { id: 'hot-chocolate-swirl', tags: ['drink'], base: 'void', field: 'heat', tone: 'grape', vessel: 'mug', form: 'cocoaSwirl', garnish: ['steam', 'none'], food: 'grape', vesselColour: 'muted', accent: 'ink', dy: 20 },

  /* ----------------------------------------------------------- breakfast */
  { id: 'pancake-stack', tags: ['breakfast'], base: 'surface', field: 'rays', tone: 'zest', vessel: 'plate', form: 'pancakeStack', garnish: ['sparkle', 'none'], food: 'zest', vesselColour: 'muted', accent: 'ink', dy: -20 },
  { id: 'egg-flip', tags: ['breakfast'], base: 'void', field: 'spot', tone: 'ink', vessel: 'pan', form: 'eggFlip', garnish: ['flame', 'none'], food: 'ink', vesselColour: 'muted', accent: 'zest', dy: -40 },
  { id: 'toast-butter', tags: ['breakfast'], base: 'void', field: 'wedge', tone: 'zest', vessel: 'plate', form: 'toastSlice', garnish: ['crumbs', 'none'], food: 'zest', vesselColour: 'muted', accent: 'ink', dy: -40 },
  { id: 'cereal-pour', tags: ['breakfast'], base: 'void', field: 'confetti', tone: 'zest', vessel: 'wideBowl', form: 'cerealPour', garnish: ['pour', 'none'], food: 'zest', vesselColour: 'muted', accent: 'ink' },
  { id: 'breakfast-tray', tags: ['breakfast', 'healthy'], base: 'surface', field: 'grid', tone: 'mint', vessel: 'tray', form: 'smallSpread', garnish: ['steam', 'none'], food: 'mint', vesselColour: 'muted', accent: 'ink' },
  { id: 'waffle-grid', tags: ['breakfast', 'dessert'], base: 'void', field: 'dots', tone: 'zest', vessel: 'plate', form: 'waffle', garnish: ['sprinkles', 'cherry'], food: 'zest', vesselColour: 'muted', accent: 'ink', dy: -40 },
  { id: 'breakfast-meat-pan', tags: ['breakfast', 'meat'], base: 'void', field: 'band', tone: 'zest', vessel: 'pan', form: 'stripsPan', garnish: ['steam', 'none'], food: 'muted', vesselColour: 'surface', accent: 'zest' },
  { id: 'toast-soldiers', tags: ['breakfast'], base: 'surface', field: 'halo', tone: 'zest', vessel: 'board', form: 'toastSoldiers', garnish: ['crumbs', 'none'], food: 'zest', vesselColour: 'muted', accent: 'ink', dy: -50 },
  { id: 'breakfast-burrito-roll', tags: ['breakfast'], base: 'void', field: 'arcs', tone: 'zest', vessel: 'board', form: 'burritoRoll', garnish: ['herb', 'none'], food: 'zest', vesselColour: 'muted', accent: 'mint', dy: -60 },
];
