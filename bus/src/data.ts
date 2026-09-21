export interface Material {
  id: string;
  name: string;
  kind: 'item' | 'fluid';
  icon: string;
  spaceAge?: boolean;
}

export interface Ingredient {
  material: string;
  amount: number;
}

export interface Recipe {
  id: string;
  name: string;
  outputs: Ingredient[];
  inputs: Ingredient[];
  alternate?: boolean;
  spaceAge?: boolean;
}

export const materials: Material[] = [
  {
    "id": "stone-brick",
    "name": "Stone brick",
    "kind": "item",
    "icon": "icons/stone-brick.png"
  },
  {
    "id": "wood",
    "name": "Wood",
    "kind": "item",
    "icon": "icons/wood.png"
  },
  {
    "id": "coal",
    "name": "Coal",
    "kind": "item",
    "icon": "icons/coal.png"
  },
  {
    "id": "stone",
    "name": "Stone",
    "kind": "item",
    "icon": "icons/stone.png"
  },
  {
    "id": "iron-ore",
    "name": "Iron ore",
    "kind": "item",
    "icon": "icons/iron-ore.png"
  },
  {
    "id": "copper-ore",
    "name": "Copper ore",
    "kind": "item",
    "icon": "icons/copper-ore.png"
  },
  {
    "id": "iron-plate",
    "name": "Iron plate",
    "kind": "item",
    "icon": "icons/iron-plate.png"
  },
  {
    "id": "copper-plate",
    "name": "Copper plate",
    "kind": "item",
    "icon": "icons/copper-plate.png"
  },
  {
    "id": "copper-cable",
    "name": "Copper cable",
    "kind": "item",
    "icon": "icons/copper-cable.png"
  },
  {
    "id": "iron-stick",
    "name": "Iron stick",
    "kind": "item",
    "icon": "icons/iron-stick.png"
  },
  {
    "id": "iron-gear-wheel",
    "name": "Iron gear wheel",
    "kind": "item",
    "icon": "icons/iron-gear-wheel.png"
  },
  {
    "id": "electronic-circuit",
    "name": "Electronic circuit",
    "kind": "item",
    "icon": "icons/electronic-circuit.png"
  },
  {
    "id": "wooden-chest",
    "name": "Wooden chest",
    "kind": "item",
    "icon": "icons/wooden-chest.png"
  },
  {
    "id": "stone-furnace",
    "name": "Stone furnace",
    "kind": "item",
    "icon": "icons/stone-furnace.png"
  },
  {
    "id": "burner-mining-drill",
    "name": "Burner mining drill",
    "kind": "item",
    "icon": "icons/burner-mining-drill.png"
  },
  {
    "id": "electric-mining-drill",
    "name": "Electric mining drill",
    "kind": "item",
    "icon": "icons/electric-mining-drill.png"
  },
  {
    "id": "burner-inserter",
    "name": "Burner inserter",
    "kind": "item",
    "icon": "icons/burner-inserter.png"
  },
  {
    "id": "inserter",
    "name": "Inserter",
    "kind": "item",
    "icon": "icons/inserter.png"
  },
  {
    "id": "fast-inserter",
    "name": "Fast inserter",
    "kind": "item",
    "icon": "icons/fast-inserter.png"
  },
  {
    "id": "long-handed-inserter",
    "name": "Long-handed inserter",
    "kind": "item",
    "icon": "icons/long-handed-inserter.png"
  },
  {
    "id": "offshore-pump",
    "name": "Offshore pump",
    "kind": "item",
    "icon": "icons/offshore-pump.png"
  },
  {
    "id": "pipe",
    "name": "Pipe",
    "kind": "item",
    "icon": "icons/pipe.png"
  },
  {
    "id": "boiler",
    "name": "Boiler",
    "kind": "item",
    "icon": "icons/boiler.png"
  },
  {
    "id": "steam-engine",
    "name": "Steam engine",
    "kind": "item",
    "icon": "icons/steam-engine.png"
  },
  {
    "id": "small-electric-pole",
    "name": "Small electric pole",
    "kind": "item",
    "icon": "icons/small-electric-pole.png"
  },
  {
    "id": "radar",
    "name": "Radar",
    "kind": "item",
    "icon": "icons/radar.png"
  },
  {
    "id": "small-lamp",
    "name": "Lamp",
    "kind": "item",
    "icon": "icons/small-lamp.png"
  },
  {
    "id": "pipe-to-ground",
    "name": "Pipe to ground",
    "kind": "item",
    "icon": "icons/pipe-to-ground.png"
  },
  {
    "id": "assembling-machine-1",
    "name": "Assembling machine 1",
    "kind": "item",
    "icon": "icons/assembling-machine-1.png"
  },
  {
    "id": "assembling-machine-2",
    "name": "Assembling machine 2",
    "kind": "item",
    "icon": "icons/assembling-machine-2.png"
  },
  {
    "id": "red-wire",
    "name": "Red wire",
    "kind": "item",
    "icon": "icons/red-wire.png"
  },
  {
    "id": "green-wire",
    "name": "Green wire",
    "kind": "item",
    "icon": "icons/green-wire.png"
  },
  {
    "id": "copper-wire",
    "name": "Copper wire",
    "kind": "item",
    "icon": "icons/copper-wire.png"
  },
  {
    "id": "stone-wall",
    "name": "Wall",
    "kind": "item",
    "icon": "icons/stone-wall.png"
  },
  {
    "id": "lab",
    "name": "Lab",
    "kind": "item",
    "icon": "icons/lab.png"
  },
  {
    "id": "automation-science-pack",
    "name": "Automation science pack",
    "kind": "item",
    "icon": "icons/automation-science-pack.png"
  },
  {
    "id": "logistic-science-pack",
    "name": "Logistic science pack",
    "kind": "item",
    "icon": "icons/logistic-science-pack.png"
  },
  {
    "id": "steel-plate",
    "name": "Steel plate",
    "kind": "item",
    "icon": "icons/steel-plate.png"
  },
  {
    "id": "engine-unit",
    "name": "Engine unit",
    "kind": "item",
    "icon": "icons/engine-unit.png"
  },
  {
    "id": "electric-furnace",
    "name": "Electric furnace",
    "kind": "item",
    "icon": "icons/electric-furnace.png"
  },
  {
    "id": "solid-fuel",
    "name": "Solid fuel",
    "kind": "item",
    "icon": "icons/solid-fuel.png"
  },
  {
    "id": "rocket-fuel",
    "name": "Rocket fuel",
    "kind": "item",
    "icon": "icons/rocket-fuel.png"
  },
  {
    "id": "iron-chest",
    "name": "Iron chest",
    "kind": "item",
    "icon": "icons/iron-chest.png"
  },
  {
    "id": "big-electric-pole",
    "name": "Big electric pole",
    "kind": "item",
    "icon": "icons/big-electric-pole.png"
  },
  {
    "id": "medium-electric-pole",
    "name": "Medium electric pole",
    "kind": "item",
    "icon": "icons/medium-electric-pole.png"
  },
  {
    "id": "steel-furnace",
    "name": "Steel furnace",
    "kind": "item",
    "icon": "icons/steel-furnace.png"
  },
  {
    "id": "gate",
    "name": "Gate",
    "kind": "item",
    "icon": "icons/gate.png"
  },
  {
    "id": "steel-chest",
    "name": "Steel chest",
    "kind": "item",
    "icon": "icons/steel-chest.png"
  },
  {
    "id": "solar-panel",
    "name": "Solar panel",
    "kind": "item",
    "icon": "icons/solar-panel.png"
  },
  {
    "id": "train-stop",
    "name": "Train stop",
    "kind": "item",
    "icon": "icons/train-stop.png"
  },
  {
    "id": "rail-signal",
    "name": "Rail signal",
    "kind": "item",
    "icon": "icons/rail-signal.png"
  },
  {
    "id": "rail-chain-signal",
    "name": "Rail chain signal",
    "kind": "item",
    "icon": "icons/rail-chain-signal.png"
  },
  {
    "id": "concrete",
    "name": "Concrete",
    "kind": "item",
    "icon": "icons/concrete.png"
  },
  {
    "id": "refined-concrete",
    "name": "Refined concrete",
    "kind": "item",
    "icon": "icons/refined-concrete.png"
  },
  {
    "id": "hazard-concrete",
    "name": "Hazard concrete",
    "kind": "item",
    "icon": "icons/hazard-concrete.png"
  },
  {
    "id": "refined-hazard-concrete",
    "name": "Refined hazard concrete",
    "kind": "item",
    "icon": "icons/refined-hazard-concrete.png"
  },
  {
    "id": "landfill",
    "name": "Landfill",
    "kind": "item",
    "icon": "icons/landfill.png"
  },
  {
    "id": "accumulator",
    "name": "Accumulator",
    "kind": "item",
    "icon": "icons/accumulator.png"
  },
  {
    "id": "uranium-ore",
    "name": "Uranium ore",
    "kind": "item",
    "icon": "icons/uranium-ore.png"
  },
  {
    "id": "transport-belt",
    "name": "Transport belt",
    "kind": "item",
    "icon": "icons/transport-belt.png"
  },
  {
    "id": "fast-transport-belt",
    "name": "Fast transport belt",
    "kind": "item",
    "icon": "icons/fast-transport-belt.png"
  },
  {
    "id": "express-transport-belt",
    "name": "Express transport belt",
    "kind": "item",
    "icon": "icons/express-transport-belt.png"
  },
  {
    "id": "bulk-inserter",
    "name": "Bulk inserter",
    "kind": "item",
    "icon": "icons/bulk-inserter.png"
  },
  {
    "id": "assembling-machine-3",
    "name": "Assembling machine 3",
    "kind": "item",
    "icon": "icons/assembling-machine-3.png"
  },
  {
    "id": "chemical-science-pack",
    "name": "Chemical science pack",
    "kind": "item",
    "icon": "icons/chemical-science-pack.png"
  },
  {
    "id": "grenade",
    "name": "Grenade",
    "kind": "item",
    "icon": "icons/grenade.png"
  },
  {
    "id": "military-science-pack",
    "name": "Military science pack",
    "kind": "item",
    "icon": "icons/military-science-pack.png"
  },
  {
    "id": "piercing-rounds-magazine",
    "name": "Piercing rounds magazine",
    "kind": "item",
    "icon": "icons/piercing-rounds-magazine.png"
  },
  {
    "id": "production-science-pack",
    "name": "Production science pack",
    "kind": "item",
    "icon": "icons/production-science-pack.png"
  },
  {
    "id": "utility-science-pack",
    "name": "Utility science pack",
    "kind": "item",
    "icon": "icons/utility-science-pack.png"
  },
  {
    "id": "space-science-pack",
    "name": "Space science pack",
    "kind": "item",
    "icon": "icons/space-science-pack.png"
  },
  {
    "id": "underground-belt",
    "name": "Underground belt",
    "kind": "item",
    "icon": "icons/underground-belt.png"
  },
  {
    "id": "fast-underground-belt",
    "name": "Fast underground belt",
    "kind": "item",
    "icon": "icons/fast-underground-belt.png"
  },
  {
    "id": "express-underground-belt",
    "name": "Express underground belt",
    "kind": "item",
    "icon": "icons/express-underground-belt.png"
  },
  {
    "id": "splitter",
    "name": "Splitter",
    "kind": "item",
    "icon": "icons/splitter.png"
  },
  {
    "id": "lane-splitter",
    "name": "Lane splitter",
    "kind": "item",
    "icon": "icons/lane-splitter.png"
  },
  {
    "id": "fast-splitter",
    "name": "Fast splitter",
    "kind": "item",
    "icon": "icons/fast-splitter.png"
  },
  {
    "id": "express-splitter",
    "name": "Express splitter",
    "kind": "item",
    "icon": "icons/express-splitter.png"
  },
  {
    "id": "loader",
    "name": "Loader",
    "kind": "item",
    "icon": "icons/loader.png"
  },
  {
    "id": "fast-loader",
    "name": "Fast loader",
    "kind": "item",
    "icon": "icons/fast-loader.png"
  },
  {
    "id": "express-loader",
    "name": "Express loader",
    "kind": "item",
    "icon": "icons/express-loader.png"
  },
  {
    "id": "advanced-circuit",
    "name": "Advanced circuit",
    "kind": "item",
    "icon": "icons/advanced-circuit.png"
  },
  {
    "id": "processing-unit",
    "name": "Processing unit",
    "kind": "item",
    "icon": "icons/processing-unit.png"
  },
  {
    "id": "logistic-robot",
    "name": "Logistic robot",
    "kind": "item",
    "icon": "icons/logistic-robot.png"
  },
  {
    "id": "construction-robot",
    "name": "Construction robot",
    "kind": "item",
    "icon": "icons/construction-robot.png"
  },
  {
    "id": "passive-provider-chest",
    "name": "Passive provider chest",
    "kind": "item",
    "icon": "icons/passive-provider-chest.png"
  },
  {
    "id": "active-provider-chest",
    "name": "Active provider chest",
    "kind": "item",
    "icon": "icons/active-provider-chest.png"
  },
  {
    "id": "storage-chest",
    "name": "Storage chest",
    "kind": "item",
    "icon": "icons/storage-chest.png"
  },
  {
    "id": "buffer-chest",
    "name": "Buffer chest",
    "kind": "item",
    "icon": "icons/buffer-chest.png"
  },
  {
    "id": "requester-chest",
    "name": "Requester chest",
    "kind": "item",
    "icon": "icons/requester-chest.png"
  },
  {
    "id": "rocket-silo",
    "name": "Rocket silo",
    "kind": "item",
    "icon": "icons/rocket-silo.png"
  },
  {
    "id": "cargo-landing-pad",
    "name": "Cargo landing pad",
    "kind": "item",
    "icon": "icons/cargo-landing-pad.png"
  },
  {
    "id": "roboport",
    "name": "Roboport",
    "kind": "item",
    "icon": "icons/roboport.png"
  },
  {
    "id": "coin",
    "name": "Coin",
    "kind": "item",
    "icon": "icons/coin.png"
  },
  {
    "id": "substation",
    "name": "Substation",
    "kind": "item",
    "icon": "icons/substation.png"
  },
  {
    "id": "beacon",
    "name": "Beacon",
    "kind": "item",
    "icon": "icons/beacon.png"
  },
  {
    "id": "storage-tank",
    "name": "Storage tank",
    "kind": "item",
    "icon": "icons/storage-tank.png"
  },
  {
    "id": "pump",
    "name": "Pump",
    "kind": "item",
    "icon": "icons/pump.png"
  },
  {
    "id": "pumpjack",
    "name": "Pumpjack",
    "kind": "item",
    "icon": "icons/pumpjack.png"
  },
  {
    "id": "oil-refinery",
    "name": "Oil refinery",
    "kind": "item",
    "icon": "icons/oil-refinery.png"
  },
  {
    "id": "chemical-plant",
    "name": "Chemical plant",
    "kind": "item",
    "icon": "icons/chemical-plant.png"
  },
  {
    "id": "sulfur",
    "name": "Sulfur",
    "kind": "item",
    "icon": "icons/sulfur.png"
  },
  {
    "id": "barrel",
    "name": "Barrel",
    "kind": "item",
    "icon": "icons/barrel.png"
  },
  {
    "id": "plastic-bar",
    "name": "Plastic bar",
    "kind": "item",
    "icon": "icons/plastic-bar.png"
  },
  {
    "id": "electric-engine-unit",
    "name": "Electric engine unit",
    "kind": "item",
    "icon": "icons/electric-engine-unit.png"
  },
  {
    "id": "explosives",
    "name": "Explosives",
    "kind": "item",
    "icon": "icons/explosives.png"
  },
  {
    "id": "battery",
    "name": "Battery",
    "kind": "item",
    "icon": "icons/battery.png"
  },
  {
    "id": "flying-robot-frame",
    "name": "Flying robot frame",
    "kind": "item",
    "icon": "icons/flying-robot-frame.png"
  },
  {
    "id": "low-density-structure",
    "name": "Low density structure",
    "kind": "item",
    "icon": "icons/low-density-structure.png"
  },
  {
    "id": "nuclear-fuel",
    "name": "Nuclear fuel",
    "kind": "item",
    "icon": "icons/nuclear-fuel.png"
  },
  {
    "id": "rocket-part",
    "name": "Rocket part",
    "kind": "item",
    "icon": "icons/rocket-part.png"
  },
  {
    "id": "electric-energy-interface",
    "name": "Electric energy interface",
    "kind": "item",
    "icon": "icons/electric-energy-interface.png"
  },
  {
    "id": "heat-interface",
    "name": "Heat interface",
    "kind": "item",
    "icon": "icons/heat-interface.png"
  },
  {
    "id": "nuclear-reactor",
    "name": "Nuclear reactor",
    "kind": "item",
    "icon": "icons/nuclear-reactor.png"
  },
  {
    "id": "uranium-235",
    "name": "Uranium-235",
    "kind": "item",
    "icon": "icons/uranium-235.png"
  },
  {
    "id": "uranium-238",
    "name": "Uranium-238",
    "kind": "item",
    "icon": "icons/uranium-238.png"
  },
  {
    "id": "centrifuge",
    "name": "Centrifuge",
    "kind": "item",
    "icon": "icons/centrifuge.png"
  },
  {
    "id": "uranium-fuel-cell",
    "name": "Uranium fuel cell",
    "kind": "item",
    "icon": "icons/uranium-fuel-cell.png"
  },
  {
    "id": "depleted-uranium-fuel-cell",
    "name": "Depleted uranium fuel cell",
    "kind": "item",
    "icon": "icons/depleted-uranium-fuel-cell.png"
  },
  {
    "id": "heat-exchanger",
    "name": "Heat exchanger",
    "kind": "item",
    "icon": "icons/heat-exchanger.png"
  },
  {
    "id": "steam-turbine",
    "name": "Steam turbine",
    "kind": "item",
    "icon": "icons/steam-turbine.png"
  },
  {
    "id": "heat-pipe",
    "name": "Heat pipe",
    "kind": "item",
    "icon": "icons/heat-pipe.png"
  },
  {
    "id": "simple-entity-with-force",
    "name": "Simple entity with force",
    "kind": "item",
    "icon": "icons/simple-entity-with-force.png"
  },
  {
    "id": "simple-entity-with-owner",
    "name": "Simple entity with owner",
    "kind": "item",
    "icon": "icons/simple-entity-with-owner.png"
  },
  {
    "id": "infinity-chest",
    "name": "Infinity chest",
    "kind": "item",
    "icon": "icons/infinity-chest.png"
  },
  {
    "id": "infinity-cargo-wagon",
    "name": "Infinity cargo wagon",
    "kind": "item",
    "icon": "icons/infinity-cargo-wagon.png"
  },
  {
    "id": "infinity-pipe",
    "name": "Infinity pipe",
    "kind": "item",
    "icon": "icons/infinity-pipe.png"
  },
  {
    "id": "burner-generator",
    "name": "Burner generator",
    "kind": "item",
    "icon": "icons/burner-generator.png"
  },
  {
    "id": "linked-chest",
    "name": "Linked chest",
    "kind": "item",
    "icon": "icons/linked-chest.png"
  },
  {
    "id": "proxy-container",
    "name": "Proxy container",
    "kind": "item",
    "icon": "icons/proxy-container.png"
  },
  {
    "id": "bottomless-chest",
    "name": "Bottomless chest",
    "kind": "item",
    "icon": "icons/bottomless-chest.png"
  },
  {
    "id": "linked-belt",
    "name": "Linked belt",
    "kind": "item",
    "icon": "icons/linked-belt.png"
  },
  {
    "id": "one-way-valve",
    "name": "One-way valve",
    "kind": "item",
    "icon": "icons/one-way-valve.png"
  },
  {
    "id": "overflow-valve",
    "name": "Overflow valve",
    "kind": "item",
    "icon": "icons/overflow-valve.png"
  },
  {
    "id": "top-up-valve",
    "name": "Top-up valve",
    "kind": "item",
    "icon": "icons/top-up-valve.png"
  },
  {
    "id": "land-mine",
    "name": "Land mine",
    "kind": "item",
    "icon": "icons/land-mine.png"
  },
  {
    "id": "solar-panel-equipment",
    "name": "Portable solar panel",
    "kind": "item",
    "icon": "icons/solar-panel-equipment.png"
  },
  {
    "id": "fission-reactor-equipment",
    "name": "Portable fission reactor",
    "kind": "item",
    "icon": "icons/fission-reactor-equipment.png"
  },
  {
    "id": "electric-energy-interface-equipment",
    "name": "Electric energy interface equipment",
    "kind": "item",
    "icon": "icons/electric-energy-interface-equipment.png"
  },
  {
    "id": "battery-equipment",
    "name": "Personal battery",
    "kind": "item",
    "icon": "icons/battery-equipment.png"
  },
  {
    "id": "battery-mk2-equipment",
    "name": "Personal battery MK2",
    "kind": "item",
    "icon": "icons/battery-mk2-equipment.png"
  },
  {
    "id": "belt-immunity-equipment",
    "name": "Belt immunity equipment",
    "kind": "item",
    "icon": "icons/belt-immunity-equipment.png"
  },
  {
    "id": "exoskeleton-equipment",
    "name": "Exoskeleton",
    "kind": "item",
    "icon": "icons/exoskeleton-equipment.png"
  },
  {
    "id": "personal-roboport-equipment",
    "name": "Personal roboport",
    "kind": "item",
    "icon": "icons/personal-roboport-equipment.png"
  },
  {
    "id": "personal-roboport-mk2-equipment",
    "name": "Personal roboport MK2",
    "kind": "item",
    "icon": "icons/personal-roboport-mk2-equipment.png"
  },
  {
    "id": "night-vision-equipment",
    "name": "Nightvision",
    "kind": "item",
    "icon": "icons/night-vision-equipment.png"
  },
  {
    "id": "energy-shield-equipment",
    "name": "Energy shield",
    "kind": "item",
    "icon": "icons/energy-shield-equipment.png"
  },
  {
    "id": "energy-shield-mk2-equipment",
    "name": "Energy shield MK2",
    "kind": "item",
    "icon": "icons/energy-shield-mk2-equipment.png"
  },
  {
    "id": "personal-laser-defense-equipment",
    "name": "Personal laser defense",
    "kind": "item",
    "icon": "icons/personal-laser-defense-equipment.png"
  },
  {
    "id": "discharge-defense-equipment",
    "name": "Discharge defense",
    "kind": "item",
    "icon": "icons/discharge-defense-equipment.png"
  },
  {
    "id": "gun-turret",
    "name": "Gun turret",
    "kind": "item",
    "icon": "icons/gun-turret.png"
  },
  {
    "id": "laser-turret",
    "name": "Laser turret",
    "kind": "item",
    "icon": "icons/laser-turret.png"
  },
  {
    "id": "flamethrower-turret",
    "name": "Flamethrower turret",
    "kind": "item",
    "icon": "icons/flamethrower-turret.png"
  },
  {
    "id": "artillery-turret",
    "name": "Artillery turret",
    "kind": "item",
    "icon": "icons/artillery-turret.png"
  },
  {
    "id": "arithmetic-combinator",
    "name": "Arithmetic combinator",
    "kind": "item",
    "icon": "icons/arithmetic-combinator.png"
  },
  {
    "id": "decider-combinator",
    "name": "Decider combinator",
    "kind": "item",
    "icon": "icons/decider-combinator.png"
  },
  {
    "id": "constant-combinator",
    "name": "Constant combinator",
    "kind": "item",
    "icon": "icons/constant-combinator.png"
  },
  {
    "id": "selector-combinator",
    "name": "Selector combinator",
    "kind": "item",
    "icon": "icons/selector-combinator.png"
  },
  {
    "id": "power-switch",
    "name": "Power switch",
    "kind": "item",
    "icon": "icons/power-switch.png"
  },
  {
    "id": "programmable-speaker",
    "name": "Programmable speaker",
    "kind": "item",
    "icon": "icons/programmable-speaker.png"
  },
  {
    "id": "display-panel",
    "name": "Display panel",
    "kind": "item",
    "icon": "icons/display-panel.png"
  },
  {
    "id": "science",
    "name": "Science",
    "kind": "item",
    "icon": "icons/science.png"
  },
  {
    "id": "rail-support",
    "name": "Rail support",
    "kind": "item",
    "icon": "icons/rail-support.png"
  },
  {
    "id": "recycler",
    "name": "Recycler",
    "kind": "item",
    "icon": "icons/recycler.png"
  },
  {
    "id": "space-platform-foundation",
    "name": "Space platform foundation",
    "kind": "item",
    "icon": "icons/space-platform-foundation.png",
    "spaceAge": true
  },
  {
    "id": "metallurgic-science-pack",
    "name": "Metallurgic science pack",
    "kind": "item",
    "icon": "icons/metallurgic-science-pack.png",
    "spaceAge": true
  },
  {
    "id": "agricultural-science-pack",
    "name": "Agricultural science pack",
    "kind": "item",
    "icon": "icons/agricultural-science-pack.png",
    "spaceAge": true
  },
  {
    "id": "electromagnetic-science-pack",
    "name": "Electromagnetic science pack",
    "kind": "item",
    "icon": "icons/electromagnetic-science-pack.png",
    "spaceAge": true
  },
  {
    "id": "cryogenic-science-pack",
    "name": "Cryogenic science pack",
    "kind": "item",
    "icon": "icons/cryogenic-science-pack.png",
    "spaceAge": true
  },
  {
    "id": "promethium-science-pack",
    "name": "Promethium science pack",
    "kind": "item",
    "icon": "icons/promethium-science-pack.png",
    "spaceAge": true
  },
  {
    "id": "turbo-transport-belt",
    "name": "Turbo transport belt",
    "kind": "item",
    "icon": "icons/turbo-transport-belt.png",
    "spaceAge": true
  },
  {
    "id": "turbo-underground-belt",
    "name": "Turbo underground belt",
    "kind": "item",
    "icon": "icons/turbo-underground-belt.png",
    "spaceAge": true
  },
  {
    "id": "turbo-splitter",
    "name": "Turbo splitter",
    "kind": "item",
    "icon": "icons/turbo-splitter.png",
    "spaceAge": true
  },
  {
    "id": "turbo-loader",
    "name": "Turbo loader",
    "kind": "item",
    "icon": "icons/turbo-loader.png",
    "spaceAge": true
  },
  {
    "id": "toolbelt-equipment",
    "name": "Toolbelt equipment",
    "kind": "item",
    "icon": "icons/toolbelt-equipment.png",
    "spaceAge": true
  },
  {
    "id": "battery-mk3-equipment",
    "name": "Personal battery MK3",
    "kind": "item",
    "icon": "icons/battery-mk3-equipment.png",
    "spaceAge": true
  },
  {
    "id": "cargo-bay",
    "name": "Cargo bay",
    "kind": "item",
    "icon": "icons/cargo-bay.png",
    "spaceAge": true
  },
  {
    "id": "landing-pad-unloading-bay",
    "name": "Landing pad unloading bay",
    "kind": "item",
    "icon": "icons/landing-pad-unloading-bay.png",
    "spaceAge": true
  },
  {
    "id": "metallic-asteroid-chunk",
    "name": "Metallic asteroid chunk",
    "kind": "item",
    "icon": "icons/metallic-asteroid-chunk.png",
    "spaceAge": true
  },
  {
    "id": "carbonic-asteroid-chunk",
    "name": "Carbonic asteroid chunk",
    "kind": "item",
    "icon": "icons/carbonic-asteroid-chunk.png",
    "spaceAge": true
  },
  {
    "id": "oxide-asteroid-chunk",
    "name": "Oxide asteroid chunk",
    "kind": "item",
    "icon": "icons/oxide-asteroid-chunk.png",
    "spaceAge": true
  },
  {
    "id": "promethium-asteroid-chunk",
    "name": "Promethium asteroid chunk",
    "kind": "item",
    "icon": "icons/promethium-asteroid-chunk.png",
    "spaceAge": true
  },
  {
    "id": "asteroid-collector",
    "name": "Asteroid collector",
    "kind": "item",
    "icon": "icons/asteroid-collector.png",
    "spaceAge": true
  },
  {
    "id": "crusher",
    "name": "Crusher",
    "kind": "item",
    "icon": "icons/crusher.png",
    "spaceAge": true
  },
  {
    "id": "thruster",
    "name": "Thruster",
    "kind": "item",
    "icon": "icons/thruster.png",
    "spaceAge": true
  },
  {
    "id": "ice",
    "name": "Ice",
    "kind": "item",
    "icon": "icons/ice.png",
    "spaceAge": true
  },
  {
    "id": "carbon",
    "name": "Carbon",
    "kind": "item",
    "icon": "icons/carbon.png",
    "spaceAge": true
  },
  {
    "id": "calcite",
    "name": "Calcite",
    "kind": "item",
    "icon": "icons/calcite.png",
    "spaceAge": true
  },
  {
    "id": "tungsten-ore",
    "name": "Tungsten ore",
    "kind": "item",
    "icon": "icons/tungsten-ore.png",
    "spaceAge": true
  },
  {
    "id": "tungsten-plate",
    "name": "Tungsten plate",
    "kind": "item",
    "icon": "icons/tungsten-plate.png",
    "spaceAge": true
  },
  {
    "id": "big-mining-drill",
    "name": "Big mining drill",
    "kind": "item",
    "icon": "icons/big-mining-drill.png",
    "spaceAge": true
  },
  {
    "id": "tungsten-carbide",
    "name": "Tungsten carbide",
    "kind": "item",
    "icon": "icons/tungsten-carbide.png",
    "spaceAge": true
  },
  {
    "id": "foundry",
    "name": "Foundry",
    "kind": "item",
    "icon": "icons/foundry.png",
    "spaceAge": true
  },
  {
    "id": "railgun-turret",
    "name": "Railgun turret",
    "kind": "item",
    "icon": "icons/railgun-turret.png",
    "spaceAge": true
  },
  {
    "id": "copper-bacteria",
    "name": "Copper bacteria",
    "kind": "item",
    "icon": "icons/copper-bacteria.png",
    "spaceAge": true
  },
  {
    "id": "iron-bacteria",
    "name": "Iron bacteria",
    "kind": "item",
    "icon": "icons/iron-bacteria.png",
    "spaceAge": true
  },
  {
    "id": "yumako-seed",
    "name": "Yumako seed",
    "kind": "item",
    "icon": "icons/yumako-seed.png",
    "spaceAge": true
  },
  {
    "id": "jellynut-seed",
    "name": "Jellynut seed",
    "kind": "item",
    "icon": "icons/jellynut-seed.png",
    "spaceAge": true
  },
  {
    "id": "nutrients",
    "name": "Nutrients",
    "kind": "item",
    "icon": "icons/nutrients.png",
    "spaceAge": true
  },
  {
    "id": "artificial-yumako-soil",
    "name": "Artificial yumako soil",
    "kind": "item",
    "icon": "icons/artificial-yumako-soil.png",
    "spaceAge": true
  },
  {
    "id": "overgrowth-yumako-soil",
    "name": "Overgrowth yumako soil",
    "kind": "item",
    "icon": "icons/overgrowth-yumako-soil.png",
    "spaceAge": true
  },
  {
    "id": "artificial-jellynut-soil",
    "name": "Artificial jellynut soil",
    "kind": "item",
    "icon": "icons/artificial-jellynut-soil.png",
    "spaceAge": true
  },
  {
    "id": "overgrowth-jellynut-soil",
    "name": "Overgrowth jellynut soil",
    "kind": "item",
    "icon": "icons/overgrowth-jellynut-soil.png",
    "spaceAge": true
  },
  {
    "id": "agricultural-tower",
    "name": "Agricultural tower",
    "kind": "item",
    "icon": "icons/agricultural-tower.png",
    "spaceAge": true
  },
  {
    "id": "biochamber",
    "name": "Biochamber",
    "kind": "item",
    "icon": "icons/biochamber.png",
    "spaceAge": true
  },
  {
    "id": "biolab",
    "name": "Biolab",
    "kind": "item",
    "icon": "icons/biolab.png",
    "spaceAge": true
  },
  {
    "id": "captive-biter-spawner",
    "name": "Captive biter spawner",
    "kind": "item",
    "icon": "icons/captive-biter-spawner.png",
    "spaceAge": true
  },
  {
    "id": "biter-egg",
    "name": "Biter egg",
    "kind": "item",
    "icon": "icons/biter-egg.png",
    "spaceAge": true
  },
  {
    "id": "pentapod-egg",
    "name": "Pentapod egg",
    "kind": "item",
    "icon": "icons/pentapod-egg.png",
    "spaceAge": true
  },
  {
    "id": "carbon-fiber",
    "name": "Carbon fiber",
    "kind": "item",
    "icon": "icons/carbon-fiber.png",
    "spaceAge": true
  },
  {
    "id": "stack-inserter",
    "name": "Stack inserter",
    "kind": "item",
    "icon": "icons/stack-inserter.png",
    "spaceAge": true
  },
  {
    "id": "rocket-turret",
    "name": "Rocket turret",
    "kind": "item",
    "icon": "icons/rocket-turret.png",
    "spaceAge": true
  },
  {
    "id": "holmium-ore",
    "name": "Holmium ore",
    "kind": "item",
    "icon": "icons/holmium-ore.png",
    "spaceAge": true
  },
  {
    "id": "holmium-plate",
    "name": "Holmium plate",
    "kind": "item",
    "icon": "icons/holmium-plate.png",
    "spaceAge": true
  },
  {
    "id": "lithium",
    "name": "Lithium",
    "kind": "item",
    "icon": "icons/lithium.png",
    "spaceAge": true
  },
  {
    "id": "lithium-plate",
    "name": "Lithium plate",
    "kind": "item",
    "icon": "icons/lithium-plate.png",
    "spaceAge": true
  },
  {
    "id": "scrap",
    "name": "Scrap",
    "kind": "item",
    "icon": "icons/scrap.png",
    "spaceAge": true
  },
  {
    "id": "lightning-rod",
    "name": "Lightning rod",
    "kind": "item",
    "icon": "icons/lightning-rod.png",
    "spaceAge": true
  },
  {
    "id": "lightning-collector",
    "name": "Lightning collector",
    "kind": "item",
    "icon": "icons/lightning-collector.png",
    "spaceAge": true
  },
  {
    "id": "heating-tower",
    "name": "Heating tower",
    "kind": "item",
    "icon": "icons/heating-tower.png",
    "spaceAge": true
  },
  {
    "id": "electromagnetic-plant",
    "name": "Electromagnetic plant",
    "kind": "item",
    "icon": "icons/electromagnetic-plant.png",
    "spaceAge": true
  },
  {
    "id": "superconductor",
    "name": "Superconductor",
    "kind": "item",
    "icon": "icons/superconductor.png",
    "spaceAge": true
  },
  {
    "id": "supercapacitor",
    "name": "Supercapacitor",
    "kind": "item",
    "icon": "icons/supercapacitor.png",
    "spaceAge": true
  },
  {
    "id": "tesla-turret",
    "name": "Tesla turret",
    "kind": "item",
    "icon": "icons/tesla-turret.png",
    "spaceAge": true
  },
  {
    "id": "quantum-processor",
    "name": "Quantum processor",
    "kind": "item",
    "icon": "icons/quantum-processor.png",
    "spaceAge": true
  },
  {
    "id": "fusion-reactor-equipment",
    "name": "Portable fusion reactor",
    "kind": "item",
    "icon": "icons/fusion-reactor-equipment.png",
    "spaceAge": true
  },
  {
    "id": "fusion-power-cell",
    "name": "Fusion power cell",
    "kind": "item",
    "icon": "icons/fusion-power-cell.png",
    "spaceAge": true
  },
  {
    "id": "fusion-reactor",
    "name": "Fusion reactor",
    "kind": "item",
    "icon": "icons/fusion-reactor.png",
    "spaceAge": true
  },
  {
    "id": "fusion-generator",
    "name": "Fusion generator",
    "kind": "item",
    "icon": "icons/fusion-generator.png",
    "spaceAge": true
  },
  {
    "id": "cryogenic-plant",
    "name": "Cryogenic plant",
    "kind": "item",
    "icon": "icons/cryogenic-plant.png",
    "spaceAge": true
  },
  {
    "id": "spoilage",
    "name": "Spoilage",
    "kind": "item",
    "icon": "icons/spoilage.png",
    "spaceAge": true
  },
  {
    "id": "ice-platform",
    "name": "Ice platform",
    "kind": "item",
    "icon": "icons/ice-platform.png",
    "spaceAge": true
  },
  {
    "id": "foundation",
    "name": "Foundation",
    "kind": "item",
    "icon": "icons/foundation.png",
    "spaceAge": true
  },
  {
    "id": "space-platform-hub",
    "name": "Space platform hub",
    "kind": "item",
    "icon": "icons/space-platform-hub.png",
    "spaceAge": true
  },
  {
    "id": "tree-seed",
    "name": "Tree seed",
    "kind": "item",
    "icon": "icons/tree-seed.png",
    "spaceAge": true
  },
  {
    "id": "water-barrel",
    "name": "Water barrel",
    "kind": "item",
    "icon": "icons/water-barrel.png"
  },
  {
    "id": "sulfuric-acid-barrel",
    "name": "Sulfuric acid barrel",
    "kind": "item",
    "icon": "icons/sulfuric-acid-barrel.png"
  },
  {
    "id": "crude-oil-barrel",
    "name": "Crude oil barrel",
    "kind": "item",
    "icon": "icons/crude-oil-barrel.png"
  },
  {
    "id": "heavy-oil-barrel",
    "name": "Heavy oil barrel",
    "kind": "item",
    "icon": "icons/heavy-oil-barrel.png"
  },
  {
    "id": "light-oil-barrel",
    "name": "Light oil barrel",
    "kind": "item",
    "icon": "icons/light-oil-barrel.png"
  },
  {
    "id": "petroleum-gas-barrel",
    "name": "Petroleum gas barrel",
    "kind": "item",
    "icon": "icons/petroleum-gas-barrel.png"
  },
  {
    "id": "lubricant-barrel",
    "name": "Lubricant barrel",
    "kind": "item",
    "icon": "icons/lubricant-barrel.png"
  },
  {
    "id": "fluoroketone-cold-barrel",
    "name": "Fluoroketone (Cold) barrel",
    "kind": "item",
    "icon": "icons/fluoroketone-cold-barrel.png"
  },
  {
    "id": "fluoroketone-hot-barrel",
    "name": "Fluoroketone (Hot) barrel",
    "kind": "item",
    "icon": "icons/fluoroketone-hot-barrel.png"
  },
  {
    "id": "water",
    "name": "Water",
    "kind": "fluid",
    "icon": "icons/fluid/water.png"
  },
  {
    "id": "steam",
    "name": "Steam",
    "kind": "fluid",
    "icon": "icons/fluid/steam.png"
  },
  {
    "id": "sulfuric-acid",
    "name": "Sulfuric Acid",
    "kind": "fluid",
    "icon": "icons/fluid/sulfuric-acid.png"
  },
  {
    "id": "crude-oil",
    "name": "Crude Oil",
    "kind": "fluid",
    "icon": "icons/fluid/crude-oil.png"
  },
  {
    "id": "heavy-oil",
    "name": "Heavy Oil",
    "kind": "fluid",
    "icon": "icons/fluid/heavy-oil.png"
  },
  {
    "id": "light-oil",
    "name": "Light Oil",
    "kind": "fluid",
    "icon": "icons/fluid/light-oil.png"
  },
  {
    "id": "petroleum-gas",
    "name": "Petroleum Gas",
    "kind": "fluid",
    "icon": "icons/fluid/petroleum-gas.png"
  },
  {
    "id": "lubricant",
    "name": "Lubricant",
    "kind": "fluid",
    "icon": "icons/fluid/lubricant.png"
  },
  {
    "id": "ammoniacal-solution",
    "name": "Ammoniacal Solution",
    "kind": "fluid",
    "icon": "icons/fluid/ammoniacal-solution.png",
    "spaceAge": true
  },
  {
    "id": "ammonia",
    "name": "Ammonia",
    "kind": "fluid",
    "icon": "icons/fluid/ammonia.png",
    "spaceAge": true
  },
  {
    "id": "fluorine",
    "name": "Fluorine",
    "kind": "fluid",
    "icon": "icons/fluid/fluorine.png",
    "spaceAge": true
  },
  {
    "id": "fluoroketone-cold",
    "name": "Fluoroketone Cold",
    "kind": "fluid",
    "icon": "icons/fluid/fluoroketone-cold.png",
    "spaceAge": true
  },
  {
    "id": "fluoroketone-hot",
    "name": "Fluoroketone Hot",
    "kind": "fluid",
    "icon": "icons/fluid/fluoroketone-hot.png",
    "spaceAge": true
  },
  {
    "id": "holmium-solution",
    "name": "Holmium Solution",
    "kind": "fluid",
    "icon": "icons/fluid/holmium-solution.png",
    "spaceAge": true
  },
  {
    "id": "electrolyte",
    "name": "Electrolyte",
    "kind": "fluid",
    "icon": "icons/fluid/electrolyte.png",
    "spaceAge": true
  },
  {
    "id": "lithium-brine",
    "name": "Lithium Brine",
    "kind": "fluid",
    "icon": "icons/fluid/lithium-brine.png",
    "spaceAge": true
  },
  {
    "id": "lava",
    "name": "Lava",
    "kind": "fluid",
    "icon": "icons/fluid/lava.png",
    "spaceAge": true
  },
  {
    "id": "molten-iron",
    "name": "Molten Iron",
    "kind": "fluid",
    "icon": "icons/fluid/molten-iron.png",
    "spaceAge": true
  },
  {
    "id": "molten-copper",
    "name": "Molten Copper",
    "kind": "fluid",
    "icon": "icons/fluid/molten-copper.png",
    "spaceAge": true
  },
  {
    "id": "thruster-fuel",
    "name": "Thruster Fuel",
    "kind": "fluid",
    "icon": "icons/fluid/thruster-fuel.png",
    "spaceAge": true
  },
  {
    "id": "thruster-oxidizer",
    "name": "Thruster Oxidizer",
    "kind": "fluid",
    "icon": "icons/fluid/thruster-oxidizer.png",
    "spaceAge": true
  },
  {
    "id": "fusion-plasma",
    "name": "Fusion Plasma",
    "kind": "fluid",
    "icon": "icons/fluid/fusion-plasma.png",
    "spaceAge": true
  }
];

export const recipes: Recipe[] = [
  {
    "id": "bulk-inserter",
    "name": "Bulk inserter",
    "outputs": [
      {
        "material": "bulk-inserter",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "iron-gear-wheel",
        "amount": 15
      },
      {
        "material": "electronic-circuit",
        "amount": 15
      },
      {
        "material": "advanced-circuit",
        "amount": 1
      },
      {
        "material": "fast-inserter",
        "amount": 1
      }
    ]
  },
  {
    "id": "basic-oil-processing",
    "name": "Basic oil processing",
    "outputs": [
      {
        "material": "petroleum-gas",
        "amount": 45
      }
    ],
    "inputs": [
      {
        "material": "crude-oil",
        "amount": 100
      }
    ]
  },
  {
    "id": "advanced-oil-processing",
    "name": "Advanced oil processing",
    "outputs": [
      {
        "material": "heavy-oil",
        "amount": 25
      },
      {
        "material": "light-oil",
        "amount": 45
      },
      {
        "material": "petroleum-gas",
        "amount": 55
      }
    ],
    "inputs": [
      {
        "material": "water",
        "amount": 50
      },
      {
        "material": "crude-oil",
        "amount": 100
      }
    ]
  },
  {
    "id": "coal-liquefaction",
    "name": "Coal liquefaction",
    "outputs": [
      {
        "material": "heavy-oil",
        "amount": 90
      },
      {
        "material": "light-oil",
        "amount": 20
      },
      {
        "material": "petroleum-gas",
        "amount": 10
      }
    ],
    "inputs": [
      {
        "material": "coal",
        "amount": 10
      },
      {
        "material": "heavy-oil",
        "amount": 25
      },
      {
        "material": "steam",
        "amount": 50
      }
    ],
    "alternate": true
  },
  {
    "id": "heavy-oil-cracking",
    "name": "Heavy oil cracking to light oil",
    "outputs": [
      {
        "material": "light-oil",
        "amount": 30
      }
    ],
    "inputs": [
      {
        "material": "water",
        "amount": 30
      },
      {
        "material": "heavy-oil",
        "amount": 40
      }
    ]
  },
  {
    "id": "light-oil-cracking",
    "name": "Light oil cracking to petroleum gas",
    "outputs": [
      {
        "material": "petroleum-gas",
        "amount": 20
      }
    ],
    "inputs": [
      {
        "material": "water",
        "amount": 30
      },
      {
        "material": "light-oil",
        "amount": 30
      }
    ],
    "alternate": true
  },
  {
    "id": "sulfuric-acid",
    "name": "Sulfuric acid",
    "outputs": [
      {
        "material": "sulfuric-acid",
        "amount": 50
      }
    ],
    "inputs": [
      {
        "material": "sulfur",
        "amount": 5
      },
      {
        "material": "iron-plate",
        "amount": 1
      },
      {
        "material": "water",
        "amount": 100
      }
    ]
  },
  {
    "id": "plastic-bar",
    "name": "Plastic bar",
    "outputs": [
      {
        "material": "plastic-bar",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "petroleum-gas",
        "amount": 20
      },
      {
        "material": "coal",
        "amount": 1
      }
    ]
  },
  {
    "id": "solid-fuel-from-light-oil",
    "name": "Solid fuel from light oil",
    "outputs": [
      {
        "material": "solid-fuel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "light-oil",
        "amount": 10
      }
    ]
  },
  {
    "id": "solid-fuel-from-petroleum-gas",
    "name": "Solid fuel from petroleum gas",
    "outputs": [
      {
        "material": "solid-fuel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "petroleum-gas",
        "amount": 20
      }
    ],
    "alternate": true
  },
  {
    "id": "solid-fuel-from-heavy-oil",
    "name": "Solid fuel from heavy oil",
    "outputs": [
      {
        "material": "solid-fuel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "heavy-oil",
        "amount": 20
      }
    ],
    "alternate": true
  },
  {
    "id": "sulfur",
    "name": "Sulfur",
    "outputs": [
      {
        "material": "sulfur",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "water",
        "amount": 30
      },
      {
        "material": "petroleum-gas",
        "amount": 30
      }
    ]
  },
  {
    "id": "lubricant",
    "name": "Lubricant",
    "outputs": [
      {
        "material": "lubricant",
        "amount": 10
      }
    ],
    "inputs": [
      {
        "material": "heavy-oil",
        "amount": 10
      }
    ]
  },
  {
    "id": "barrel",
    "name": "Barrel",
    "outputs": [
      {
        "material": "barrel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-plate",
        "amount": 1
      }
    ]
  },
  {
    "id": "night-vision-equipment",
    "name": "Nightvision",
    "outputs": [
      {
        "material": "night-vision-equipment",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "advanced-circuit",
        "amount": 5
      },
      {
        "material": "steel-plate",
        "amount": 10
      }
    ]
  },
  {
    "id": "belt-immunity-equipment",
    "name": "Belt immunity equipment",
    "outputs": [
      {
        "material": "belt-immunity-equipment",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "advanced-circuit",
        "amount": 5
      },
      {
        "material": "steel-plate",
        "amount": 10
      }
    ]
  },
  {
    "id": "energy-shield-equipment",
    "name": "Energy shield",
    "outputs": [
      {
        "material": "energy-shield-equipment",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "advanced-circuit",
        "amount": 5
      },
      {
        "material": "steel-plate",
        "amount": 10
      }
    ]
  },
  {
    "id": "energy-shield-mk2-equipment",
    "name": "Energy shield MK2",
    "outputs": [
      {
        "material": "energy-shield-mk2-equipment",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "energy-shield-equipment",
        "amount": 10
      },
      {
        "material": "processing-unit",
        "amount": 5
      },
      {
        "material": "low-density-structure",
        "amount": 5
      }
    ]
  },
  {
    "id": "battery-equipment",
    "name": "Personal battery",
    "outputs": [
      {
        "material": "battery-equipment",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "battery",
        "amount": 5
      },
      {
        "material": "steel-plate",
        "amount": 10
      }
    ]
  },
  {
    "id": "battery-mk2-equipment",
    "name": "Personal battery MK2",
    "outputs": [
      {
        "material": "battery-mk2-equipment",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "battery-equipment",
        "amount": 10
      },
      {
        "material": "processing-unit",
        "amount": 15
      },
      {
        "material": "low-density-structure",
        "amount": 5
      }
    ]
  },
  {
    "id": "solar-panel-equipment",
    "name": "Portable solar panel",
    "outputs": [
      {
        "material": "solar-panel-equipment",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "solar-panel",
        "amount": 1
      },
      {
        "material": "advanced-circuit",
        "amount": 2
      },
      {
        "material": "steel-plate",
        "amount": 5
      }
    ]
  },
  {
    "id": "fission-reactor-equipment",
    "name": "Portable fission reactor",
    "outputs": [
      {
        "material": "fission-reactor-equipment",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "processing-unit",
        "amount": 200
      },
      {
        "material": "low-density-structure",
        "amount": 50
      },
      {
        "material": "uranium-fuel-cell",
        "amount": 4
      }
    ]
  },
  {
    "id": "personal-laser-defense-equipment",
    "name": "Personal laser defense",
    "outputs": [
      {
        "material": "personal-laser-defense-equipment",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "processing-unit",
        "amount": 20
      },
      {
        "material": "low-density-structure",
        "amount": 5
      },
      {
        "material": "laser-turret",
        "amount": 5
      }
    ]
  },
  {
    "id": "discharge-defense-equipment",
    "name": "Discharge defense",
    "outputs": [
      {
        "material": "discharge-defense-equipment",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "processing-unit",
        "amount": 5
      },
      {
        "material": "steel-plate",
        "amount": 20
      },
      {
        "material": "laser-turret",
        "amount": 10
      }
    ]
  },
  {
    "id": "exoskeleton-equipment",
    "name": "Exoskeleton",
    "outputs": [
      {
        "material": "exoskeleton-equipment",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "processing-unit",
        "amount": 10
      },
      {
        "material": "electric-engine-unit",
        "amount": 30
      },
      {
        "material": "steel-plate",
        "amount": 20
      }
    ]
  },
  {
    "id": "personal-roboport-equipment",
    "name": "Personal roboport",
    "outputs": [
      {
        "material": "personal-roboport-equipment",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "advanced-circuit",
        "amount": 10
      },
      {
        "material": "iron-gear-wheel",
        "amount": 40
      },
      {
        "material": "steel-plate",
        "amount": 20
      },
      {
        "material": "battery",
        "amount": 45
      }
    ]
  },
  {
    "id": "personal-roboport-mk2-equipment",
    "name": "Personal roboport MK2",
    "outputs": [
      {
        "material": "personal-roboport-mk2-equipment",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "personal-roboport-equipment",
        "amount": 5
      },
      {
        "material": "processing-unit",
        "amount": 50
      },
      {
        "material": "superconductor",
        "amount": 50
      }
    ]
  },
  {
    "id": "laser-turret",
    "name": "Laser turret",
    "outputs": [
      {
        "material": "laser-turret",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-plate",
        "amount": 20
      },
      {
        "material": "electronic-circuit",
        "amount": 20
      },
      {
        "material": "battery",
        "amount": 12
      }
    ]
  },
  {
    "id": "flamethrower-turret",
    "name": "Flamethrower turret",
    "outputs": [
      {
        "material": "flamethrower-turret",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-plate",
        "amount": 30
      },
      {
        "material": "iron-gear-wheel",
        "amount": 15
      },
      {
        "material": "pipe",
        "amount": 10
      },
      {
        "material": "engine-unit",
        "amount": 5
      }
    ]
  },
  {
    "id": "artillery-turret",
    "name": "Artillery turret",
    "outputs": [
      {
        "material": "artillery-turret",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "tungsten-plate",
        "amount": 60
      },
      {
        "material": "refined-concrete",
        "amount": 60
      },
      {
        "material": "iron-gear-wheel",
        "amount": 40
      },
      {
        "material": "processing-unit",
        "amount": 10
      }
    ]
  },
  {
    "id": "gun-turret",
    "name": "Gun turret",
    "outputs": [
      {
        "material": "gun-turret",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "iron-gear-wheel",
        "amount": 10
      },
      {
        "material": "copper-plate",
        "amount": 10
      },
      {
        "material": "iron-plate",
        "amount": 20
      }
    ]
  },
  {
    "id": "wooden-chest",
    "name": "Wooden chest",
    "outputs": [
      {
        "material": "wooden-chest",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "wood",
        "amount": 2
      }
    ]
  },
  {
    "id": "display-panel",
    "name": "Display panel",
    "outputs": [
      {
        "material": "display-panel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "iron-plate",
        "amount": 1
      },
      {
        "material": "electronic-circuit",
        "amount": 1
      }
    ]
  },
  {
    "id": "iron-stick",
    "name": "Iron stick",
    "outputs": [
      {
        "material": "iron-stick",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "iron-plate",
        "amount": 1
      }
    ]
  },
  {
    "id": "stone-furnace",
    "name": "Stone furnace",
    "outputs": [
      {
        "material": "stone-furnace",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "stone",
        "amount": 5
      }
    ]
  },
  {
    "id": "boiler",
    "name": "Boiler",
    "outputs": [
      {
        "material": "boiler",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "stone-furnace",
        "amount": 1
      },
      {
        "material": "pipe",
        "amount": 4
      }
    ]
  },
  {
    "id": "steam-engine",
    "name": "Steam engine",
    "outputs": [
      {
        "material": "steam-engine",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "iron-gear-wheel",
        "amount": 8
      },
      {
        "material": "pipe",
        "amount": 5
      },
      {
        "material": "iron-plate",
        "amount": 10
      }
    ]
  },
  {
    "id": "iron-gear-wheel",
    "name": "Iron gear wheel",
    "outputs": [
      {
        "material": "iron-gear-wheel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "iron-plate",
        "amount": 2
      }
    ]
  },
  {
    "id": "electronic-circuit",
    "name": "Electronic circuit",
    "outputs": [
      {
        "material": "electronic-circuit",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "iron-plate",
        "amount": 1
      },
      {
        "material": "copper-cable",
        "amount": 3
      }
    ]
  },
  {
    "id": "transport-belt",
    "name": "Transport belt",
    "outputs": [
      {
        "material": "transport-belt",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "iron-plate",
        "amount": 1
      },
      {
        "material": "iron-gear-wheel",
        "amount": 1
      }
    ]
  },
  {
    "id": "electric-mining-drill",
    "name": "Electric mining drill",
    "outputs": [
      {
        "material": "electric-mining-drill",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "electronic-circuit",
        "amount": 3
      },
      {
        "material": "iron-gear-wheel",
        "amount": 5
      },
      {
        "material": "iron-plate",
        "amount": 10
      }
    ]
  },
  {
    "id": "burner-mining-drill",
    "name": "Burner mining drill",
    "outputs": [
      {
        "material": "burner-mining-drill",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "iron-gear-wheel",
        "amount": 3
      },
      {
        "material": "stone-furnace",
        "amount": 1
      },
      {
        "material": "iron-plate",
        "amount": 3
      }
    ]
  },
  {
    "id": "inserter",
    "name": "Inserter",
    "outputs": [
      {
        "material": "inserter",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "electronic-circuit",
        "amount": 1
      },
      {
        "material": "iron-gear-wheel",
        "amount": 1
      },
      {
        "material": "iron-plate",
        "amount": 1
      }
    ]
  },
  {
    "id": "fast-inserter",
    "name": "Fast inserter",
    "outputs": [
      {
        "material": "fast-inserter",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "electronic-circuit",
        "amount": 2
      },
      {
        "material": "iron-plate",
        "amount": 2
      },
      {
        "material": "inserter",
        "amount": 1
      }
    ]
  },
  {
    "id": "long-handed-inserter",
    "name": "Long-handed inserter",
    "outputs": [
      {
        "material": "long-handed-inserter",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "iron-gear-wheel",
        "amount": 1
      },
      {
        "material": "iron-plate",
        "amount": 1
      },
      {
        "material": "inserter",
        "amount": 1
      }
    ]
  },
  {
    "id": "burner-inserter",
    "name": "Burner inserter",
    "outputs": [
      {
        "material": "burner-inserter",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "iron-plate",
        "amount": 1
      },
      {
        "material": "iron-gear-wheel",
        "amount": 1
      }
    ]
  },
  {
    "id": "pipe",
    "name": "Pipe",
    "outputs": [
      {
        "material": "pipe",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "iron-plate",
        "amount": 1
      }
    ]
  },
  {
    "id": "offshore-pump",
    "name": "Offshore pump",
    "outputs": [
      {
        "material": "offshore-pump",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "pipe",
        "amount": 3
      },
      {
        "material": "iron-gear-wheel",
        "amount": 2
      }
    ]
  },
  {
    "id": "copper-cable",
    "name": "Copper cable",
    "outputs": [
      {
        "material": "copper-cable",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "copper-plate",
        "amount": 1
      }
    ]
  },
  {
    "id": "small-electric-pole",
    "name": "Small electric pole",
    "outputs": [
      {
        "material": "small-electric-pole",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "wood",
        "amount": 1
      },
      {
        "material": "copper-cable",
        "amount": 2
      }
    ]
  },
  {
    "id": "radar",
    "name": "Radar",
    "outputs": [
      {
        "material": "radar",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "electronic-circuit",
        "amount": 5
      },
      {
        "material": "iron-gear-wheel",
        "amount": 5
      },
      {
        "material": "iron-plate",
        "amount": 10
      }
    ]
  },
  {
    "id": "small-lamp",
    "name": "Lamp",
    "outputs": [
      {
        "material": "small-lamp",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "electronic-circuit",
        "amount": 1
      },
      {
        "material": "copper-cable",
        "amount": 3
      },
      {
        "material": "iron-plate",
        "amount": 1
      }
    ]
  },
  {
    "id": "pipe-to-ground",
    "name": "Pipe to ground",
    "outputs": [
      {
        "material": "pipe-to-ground",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "pipe",
        "amount": 10
      },
      {
        "material": "iron-plate",
        "amount": 5
      }
    ]
  },
  {
    "id": "assembling-machine-1",
    "name": "Assembling machine 1",
    "outputs": [
      {
        "material": "assembling-machine-1",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "electronic-circuit",
        "amount": 3
      },
      {
        "material": "iron-gear-wheel",
        "amount": 5
      },
      {
        "material": "iron-plate",
        "amount": 9
      }
    ]
  },
  {
    "id": "automation-science-pack",
    "name": "Automation science pack",
    "outputs": [
      {
        "material": "automation-science-pack",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "copper-plate",
        "amount": 1
      },
      {
        "material": "iron-gear-wheel",
        "amount": 1
      }
    ]
  },
  {
    "id": "logistic-science-pack",
    "name": "Logistic science pack",
    "outputs": [
      {
        "material": "logistic-science-pack",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "inserter",
        "amount": 1
      },
      {
        "material": "transport-belt",
        "amount": 1
      }
    ]
  },
  {
    "id": "lab",
    "name": "Lab",
    "outputs": [
      {
        "material": "lab",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "electronic-circuit",
        "amount": 10
      },
      {
        "material": "iron-gear-wheel",
        "amount": 10
      },
      {
        "material": "transport-belt",
        "amount": 4
      }
    ]
  },
  {
    "id": "stone-wall",
    "name": "Wall",
    "outputs": [
      {
        "material": "stone-wall",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "stone-brick",
        "amount": 5
      }
    ]
  },
  {
    "id": "assembling-machine-2",
    "name": "Assembling machine 2",
    "outputs": [
      {
        "material": "assembling-machine-2",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-plate",
        "amount": 2
      },
      {
        "material": "electronic-circuit",
        "amount": 3
      },
      {
        "material": "iron-gear-wheel",
        "amount": 5
      },
      {
        "material": "assembling-machine-1",
        "amount": 1
      }
    ]
  },
  {
    "id": "splitter",
    "name": "Splitter",
    "outputs": [
      {
        "material": "splitter",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "electronic-circuit",
        "amount": 5
      },
      {
        "material": "iron-plate",
        "amount": 5
      },
      {
        "material": "transport-belt",
        "amount": 4
      }
    ]
  },
  {
    "id": "underground-belt",
    "name": "Underground belt",
    "outputs": [
      {
        "material": "underground-belt",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "iron-plate",
        "amount": 10
      },
      {
        "material": "transport-belt",
        "amount": 5
      }
    ]
  },
  {
    "id": "loader",
    "name": "Loader",
    "outputs": [
      {
        "material": "loader",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "inserter",
        "amount": 5
      },
      {
        "material": "electronic-circuit",
        "amount": 5
      },
      {
        "material": "iron-gear-wheel",
        "amount": 5
      },
      {
        "material": "iron-plate",
        "amount": 5
      },
      {
        "material": "transport-belt",
        "amount": 5
      }
    ]
  },
  {
    "id": "engine-unit",
    "name": "Engine unit",
    "outputs": [
      {
        "material": "engine-unit",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-plate",
        "amount": 1
      },
      {
        "material": "iron-gear-wheel",
        "amount": 1
      },
      {
        "material": "pipe",
        "amount": 2
      }
    ]
  },
  {
    "id": "iron-chest",
    "name": "Iron chest",
    "outputs": [
      {
        "material": "iron-chest",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "iron-plate",
        "amount": 8
      }
    ]
  },
  {
    "id": "big-electric-pole",
    "name": "Big electric pole",
    "outputs": [
      {
        "material": "big-electric-pole",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "iron-stick",
        "amount": 8
      },
      {
        "material": "steel-plate",
        "amount": 5
      },
      {
        "material": "copper-cable",
        "amount": 4
      }
    ]
  },
  {
    "id": "medium-electric-pole",
    "name": "Medium electric pole",
    "outputs": [
      {
        "material": "medium-electric-pole",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "iron-stick",
        "amount": 4
      },
      {
        "material": "steel-plate",
        "amount": 2
      },
      {
        "material": "copper-cable",
        "amount": 2
      }
    ]
  },
  {
    "id": "steel-furnace",
    "name": "Steel furnace",
    "outputs": [
      {
        "material": "steel-furnace",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-plate",
        "amount": 6
      },
      {
        "material": "stone-brick",
        "amount": 10
      }
    ]
  },
  {
    "id": "gate",
    "name": "Gate",
    "outputs": [
      {
        "material": "gate",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "stone-wall",
        "amount": 1
      },
      {
        "material": "steel-plate",
        "amount": 2
      },
      {
        "material": "electronic-circuit",
        "amount": 2
      }
    ]
  },
  {
    "id": "steel-chest",
    "name": "Steel chest",
    "outputs": [
      {
        "material": "steel-chest",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-plate",
        "amount": 8
      }
    ]
  },
  {
    "id": "fast-underground-belt",
    "name": "Fast underground belt",
    "outputs": [
      {
        "material": "fast-underground-belt",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "iron-gear-wheel",
        "amount": 40
      },
      {
        "material": "underground-belt",
        "amount": 2
      }
    ]
  },
  {
    "id": "fast-splitter",
    "name": "Fast splitter",
    "outputs": [
      {
        "material": "fast-splitter",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "splitter",
        "amount": 1
      },
      {
        "material": "iron-gear-wheel",
        "amount": 10
      },
      {
        "material": "electronic-circuit",
        "amount": 10
      }
    ]
  },
  {
    "id": "concrete",
    "name": "Concrete",
    "outputs": [
      {
        "material": "concrete",
        "amount": 10
      }
    ],
    "inputs": [
      {
        "material": "stone-brick",
        "amount": 5
      },
      {
        "material": "iron-ore",
        "amount": 1
      },
      {
        "material": "water",
        "amount": 100
      }
    ]
  },
  {
    "id": "hazard-concrete",
    "name": "Hazard concrete",
    "outputs": [
      {
        "material": "hazard-concrete",
        "amount": 10
      }
    ],
    "inputs": [
      {
        "material": "concrete",
        "amount": 10
      }
    ]
  },
  {
    "id": "refined-concrete",
    "name": "Refined concrete",
    "outputs": [
      {
        "material": "refined-concrete",
        "amount": 10
      }
    ],
    "inputs": [
      {
        "material": "concrete",
        "amount": 20
      },
      {
        "material": "iron-stick",
        "amount": 8
      },
      {
        "material": "steel-plate",
        "amount": 1
      },
      {
        "material": "water",
        "amount": 100
      }
    ]
  },
  {
    "id": "refined-hazard-concrete",
    "name": "Refined hazard concrete",
    "outputs": [
      {
        "material": "refined-hazard-concrete",
        "amount": 10
      }
    ],
    "inputs": [
      {
        "material": "refined-concrete",
        "amount": 10
      }
    ]
  },
  {
    "id": "landfill",
    "name": "Landfill",
    "outputs": [
      {
        "material": "landfill",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "stone",
        "amount": 50
      }
    ]
  },
  {
    "id": "fast-transport-belt",
    "name": "Fast transport belt",
    "outputs": [
      {
        "material": "fast-transport-belt",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "iron-gear-wheel",
        "amount": 5
      },
      {
        "material": "transport-belt",
        "amount": 1
      }
    ]
  },
  {
    "id": "solar-panel",
    "name": "Solar panel",
    "outputs": [
      {
        "material": "solar-panel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-plate",
        "amount": 5
      },
      {
        "material": "electronic-circuit",
        "amount": 15
      },
      {
        "material": "copper-plate",
        "amount": 5
      }
    ]
  },
  {
    "id": "rail-signal",
    "name": "Rail signal",
    "outputs": [
      {
        "material": "rail-signal",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "electronic-circuit",
        "amount": 1
      },
      {
        "material": "iron-plate",
        "amount": 5
      }
    ]
  },
  {
    "id": "rail-chain-signal",
    "name": "Rail chain signal",
    "outputs": [
      {
        "material": "rail-chain-signal",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "electronic-circuit",
        "amount": 1
      },
      {
        "material": "iron-plate",
        "amount": 5
      }
    ]
  },
  {
    "id": "train-stop",
    "name": "Train stop",
    "outputs": [
      {
        "material": "train-stop",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "electronic-circuit",
        "amount": 5
      },
      {
        "material": "iron-plate",
        "amount": 6
      },
      {
        "material": "iron-stick",
        "amount": 6
      },
      {
        "material": "steel-plate",
        "amount": 3
      }
    ]
  },
  {
    "id": "copper-plate",
    "name": "Copper plate",
    "outputs": [
      {
        "material": "copper-plate",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "copper-ore",
        "amount": 1
      }
    ]
  },
  {
    "id": "iron-plate",
    "name": "Iron plate",
    "outputs": [
      {
        "material": "iron-plate",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "iron-ore",
        "amount": 1
      }
    ]
  },
  {
    "id": "stone-brick",
    "name": "Stone brick",
    "outputs": [
      {
        "material": "stone-brick",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "stone",
        "amount": 2
      }
    ]
  },
  {
    "id": "steel-plate",
    "name": "Steel plate",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "iron-plate",
        "amount": 5
      }
    ]
  },
  {
    "id": "arithmetic-combinator",
    "name": "Arithmetic combinator",
    "outputs": [
      {
        "material": "arithmetic-combinator",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "copper-cable",
        "amount": 5
      },
      {
        "material": "electronic-circuit",
        "amount": 5
      }
    ]
  },
  {
    "id": "decider-combinator",
    "name": "Decider combinator",
    "outputs": [
      {
        "material": "decider-combinator",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "copper-cable",
        "amount": 5
      },
      {
        "material": "electronic-circuit",
        "amount": 5
      }
    ]
  },
  {
    "id": "constant-combinator",
    "name": "Constant combinator",
    "outputs": [
      {
        "material": "constant-combinator",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "copper-cable",
        "amount": 5
      },
      {
        "material": "electronic-circuit",
        "amount": 2
      }
    ]
  },
  {
    "id": "selector-combinator",
    "name": "Selector combinator",
    "outputs": [
      {
        "material": "selector-combinator",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "advanced-circuit",
        "amount": 2
      },
      {
        "material": "decider-combinator",
        "amount": 5
      }
    ]
  },
  {
    "id": "power-switch",
    "name": "Power switch",
    "outputs": [
      {
        "material": "power-switch",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "iron-plate",
        "amount": 5
      },
      {
        "material": "copper-cable",
        "amount": 5
      },
      {
        "material": "electronic-circuit",
        "amount": 2
      }
    ]
  },
  {
    "id": "programmable-speaker",
    "name": "Programmable speaker",
    "outputs": [
      {
        "material": "programmable-speaker",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "iron-plate",
        "amount": 3
      },
      {
        "material": "iron-stick",
        "amount": 4
      },
      {
        "material": "copper-cable",
        "amount": 5
      },
      {
        "material": "electronic-circuit",
        "amount": 4
      }
    ]
  },
  {
    "id": "express-transport-belt",
    "name": "Express transport belt",
    "outputs": [
      {
        "material": "express-transport-belt",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "iron-gear-wheel",
        "amount": 10
      },
      {
        "material": "fast-transport-belt",
        "amount": 1
      },
      {
        "material": "lubricant",
        "amount": 20
      }
    ]
  },
  {
    "id": "assembling-machine-3",
    "name": "Assembling machine 3",
    "outputs": [
      {
        "material": "assembling-machine-3",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "assembling-machine-2",
        "amount": 2
      }
    ]
  },
  {
    "id": "land-mine",
    "name": "Land mine",
    "outputs": [
      {
        "material": "land-mine",
        "amount": 4
      }
    ],
    "inputs": [
      {
        "material": "steel-plate",
        "amount": 1
      },
      {
        "material": "explosives",
        "amount": 2
      }
    ]
  },
  {
    "id": "chemical-science-pack",
    "name": "Chemical science pack",
    "outputs": [
      {
        "material": "chemical-science-pack",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "engine-unit",
        "amount": 2
      },
      {
        "material": "advanced-circuit",
        "amount": 3
      },
      {
        "material": "sulfur",
        "amount": 1
      }
    ]
  },
  {
    "id": "military-science-pack",
    "name": "Military science pack",
    "outputs": [
      {
        "material": "military-science-pack",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "grenade",
        "amount": 1
      },
      {
        "material": "piercing-rounds-magazine",
        "amount": 1
      },
      {
        "material": "stone-wall",
        "amount": 2
      }
    ]
  },
  {
    "id": "production-science-pack",
    "name": "Production science pack",
    "outputs": [
      {
        "material": "production-science-pack",
        "amount": 3
      }
    ],
    "inputs": [
      {
        "material": "electric-furnace",
        "amount": 1
      }
    ]
  },
  {
    "id": "utility-science-pack",
    "name": "Utility science pack",
    "outputs": [
      {
        "material": "utility-science-pack",
        "amount": 3
      }
    ],
    "inputs": [
      {
        "material": "low-density-structure",
        "amount": 3
      },
      {
        "material": "processing-unit",
        "amount": 2
      },
      {
        "material": "flying-robot-frame",
        "amount": 1
      }
    ]
  },
  {
    "id": "express-underground-belt",
    "name": "Express underground belt",
    "outputs": [
      {
        "material": "express-underground-belt",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "iron-gear-wheel",
        "amount": 80
      },
      {
        "material": "fast-underground-belt",
        "amount": 2
      },
      {
        "material": "lubricant",
        "amount": 40
      }
    ]
  },
  {
    "id": "fast-loader",
    "name": "Fast loader",
    "outputs": [
      {
        "material": "fast-loader",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "fast-transport-belt",
        "amount": 5
      },
      {
        "material": "loader",
        "amount": 1
      }
    ]
  },
  {
    "id": "express-loader",
    "name": "Express loader",
    "outputs": [
      {
        "material": "express-loader",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "express-transport-belt",
        "amount": 5
      },
      {
        "material": "fast-loader",
        "amount": 1
      }
    ]
  },
  {
    "id": "express-splitter",
    "name": "Express splitter",
    "outputs": [
      {
        "material": "express-splitter",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "fast-splitter",
        "amount": 1
      },
      {
        "material": "iron-gear-wheel",
        "amount": 10
      },
      {
        "material": "advanced-circuit",
        "amount": 10
      },
      {
        "material": "lubricant",
        "amount": 80
      }
    ]
  },
  {
    "id": "advanced-circuit",
    "name": "Advanced circuit",
    "outputs": [
      {
        "material": "advanced-circuit",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "electronic-circuit",
        "amount": 2
      },
      {
        "material": "plastic-bar",
        "amount": 2
      },
      {
        "material": "copper-cable",
        "amount": 4
      }
    ]
  },
  {
    "id": "processing-unit",
    "name": "Processing unit",
    "outputs": [
      {
        "material": "processing-unit",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "electronic-circuit",
        "amount": 20
      },
      {
        "material": "advanced-circuit",
        "amount": 2
      },
      {
        "material": "sulfuric-acid",
        "amount": 5
      }
    ]
  },
  {
    "id": "logistic-robot",
    "name": "Logistic robot",
    "outputs": [
      {
        "material": "logistic-robot",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "flying-robot-frame",
        "amount": 1
      },
      {
        "material": "advanced-circuit",
        "amount": 2
      }
    ]
  },
  {
    "id": "construction-robot",
    "name": "Construction robot",
    "outputs": [
      {
        "material": "construction-robot",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "flying-robot-frame",
        "amount": 1
      },
      {
        "material": "electronic-circuit",
        "amount": 2
      }
    ]
  },
  {
    "id": "passive-provider-chest",
    "name": "Passive provider chest",
    "outputs": [
      {
        "material": "passive-provider-chest",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-chest",
        "amount": 1
      },
      {
        "material": "electronic-circuit",
        "amount": 3
      },
      {
        "material": "advanced-circuit",
        "amount": 1
      }
    ]
  },
  {
    "id": "active-provider-chest",
    "name": "Active provider chest",
    "outputs": [
      {
        "material": "active-provider-chest",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-chest",
        "amount": 1
      },
      {
        "material": "electronic-circuit",
        "amount": 3
      },
      {
        "material": "advanced-circuit",
        "amount": 1
      }
    ]
  },
  {
    "id": "storage-chest",
    "name": "Storage chest",
    "outputs": [
      {
        "material": "storage-chest",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-chest",
        "amount": 1
      },
      {
        "material": "electronic-circuit",
        "amount": 3
      },
      {
        "material": "advanced-circuit",
        "amount": 1
      }
    ]
  },
  {
    "id": "buffer-chest",
    "name": "Buffer chest",
    "outputs": [
      {
        "material": "buffer-chest",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-chest",
        "amount": 1
      },
      {
        "material": "electronic-circuit",
        "amount": 3
      },
      {
        "material": "advanced-circuit",
        "amount": 1
      }
    ]
  },
  {
    "id": "requester-chest",
    "name": "Requester chest",
    "outputs": [
      {
        "material": "requester-chest",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-chest",
        "amount": 1
      },
      {
        "material": "electronic-circuit",
        "amount": 3
      },
      {
        "material": "advanced-circuit",
        "amount": 1
      }
    ]
  },
  {
    "id": "rocket-silo",
    "name": "Rocket silo",
    "outputs": [
      {
        "material": "rocket-silo",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-plate",
        "amount": 1000
      },
      {
        "material": "concrete",
        "amount": 1000
      },
      {
        "material": "pipe",
        "amount": 100
      },
      {
        "material": "processing-unit",
        "amount": 200
      },
      {
        "material": "electric-engine-unit",
        "amount": 200
      }
    ]
  },
  {
    "id": "cargo-landing-pad",
    "name": "Cargo landing pad",
    "outputs": [
      {
        "material": "cargo-landing-pad",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "concrete",
        "amount": 200
      },
      {
        "material": "steel-plate",
        "amount": 25
      },
      {
        "material": "processing-unit",
        "amount": 10
      }
    ]
  },
  {
    "id": "roboport",
    "name": "Roboport",
    "outputs": [
      {
        "material": "roboport",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-plate",
        "amount": 45
      },
      {
        "material": "iron-gear-wheel",
        "amount": 45
      },
      {
        "material": "advanced-circuit",
        "amount": 45
      }
    ]
  },
  {
    "id": "substation",
    "name": "Substation",
    "outputs": [
      {
        "material": "substation",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-plate",
        "amount": 10
      },
      {
        "material": "advanced-circuit",
        "amount": 5
      },
      {
        "material": "copper-cable",
        "amount": 6
      }
    ]
  },
  {
    "id": "accumulator",
    "name": "Accumulator",
    "outputs": [
      {
        "material": "accumulator",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "iron-plate",
        "amount": 2
      },
      {
        "material": "battery",
        "amount": 5
      }
    ]
  },
  {
    "id": "electric-furnace",
    "name": "Electric furnace",
    "outputs": [
      {
        "material": "electric-furnace",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-plate",
        "amount": 10
      },
      {
        "material": "advanced-circuit",
        "amount": 5
      },
      {
        "material": "stone-brick",
        "amount": 10
      }
    ]
  },
  {
    "id": "beacon",
    "name": "Beacon",
    "outputs": [
      {
        "material": "beacon",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "electronic-circuit",
        "amount": 20
      },
      {
        "material": "advanced-circuit",
        "amount": 20
      },
      {
        "material": "steel-plate",
        "amount": 10
      },
      {
        "material": "copper-cable",
        "amount": 10
      }
    ]
  },
  {
    "id": "pumpjack",
    "name": "Pumpjack",
    "outputs": [
      {
        "material": "pumpjack",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-plate",
        "amount": 5
      },
      {
        "material": "iron-gear-wheel",
        "amount": 10
      },
      {
        "material": "electronic-circuit",
        "amount": 5
      },
      {
        "material": "pipe",
        "amount": 10
      }
    ]
  },
  {
    "id": "oil-refinery",
    "name": "Oil refinery",
    "outputs": [
      {
        "material": "oil-refinery",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-plate",
        "amount": 15
      },
      {
        "material": "iron-gear-wheel",
        "amount": 10
      },
      {
        "material": "stone-brick",
        "amount": 10
      },
      {
        "material": "electronic-circuit",
        "amount": 10
      },
      {
        "material": "pipe",
        "amount": 10
      }
    ]
  },
  {
    "id": "electric-engine-unit",
    "name": "Electric engine unit",
    "outputs": [
      {
        "material": "electric-engine-unit",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "engine-unit",
        "amount": 1
      },
      {
        "material": "lubricant",
        "amount": 15
      },
      {
        "material": "electronic-circuit",
        "amount": 2
      }
    ]
  },
  {
    "id": "flying-robot-frame",
    "name": "Flying robot frame",
    "outputs": [
      {
        "material": "flying-robot-frame",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "electric-engine-unit",
        "amount": 1
      },
      {
        "material": "battery",
        "amount": 2
      },
      {
        "material": "steel-plate",
        "amount": 1
      },
      {
        "material": "electronic-circuit",
        "amount": 3
      }
    ]
  },
  {
    "id": "explosives",
    "name": "Explosives",
    "outputs": [
      {
        "material": "explosives",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "sulfur",
        "amount": 1
      },
      {
        "material": "coal",
        "amount": 1
      },
      {
        "material": "water",
        "amount": 10
      }
    ]
  },
  {
    "id": "battery",
    "name": "Battery",
    "outputs": [
      {
        "material": "battery",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "sulfuric-acid",
        "amount": 20
      },
      {
        "material": "iron-plate",
        "amount": 1
      },
      {
        "material": "copper-plate",
        "amount": 1
      }
    ]
  },
  {
    "id": "storage-tank",
    "name": "Storage tank",
    "outputs": [
      {
        "material": "storage-tank",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "iron-plate",
        "amount": 20
      },
      {
        "material": "steel-plate",
        "amount": 5
      }
    ]
  },
  {
    "id": "pump",
    "name": "Pump",
    "outputs": [
      {
        "material": "pump",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "engine-unit",
        "amount": 1
      },
      {
        "material": "steel-plate",
        "amount": 1
      },
      {
        "material": "pipe",
        "amount": 1
      }
    ]
  },
  {
    "id": "chemical-plant",
    "name": "Chemical plant",
    "outputs": [
      {
        "material": "chemical-plant",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-plate",
        "amount": 5
      },
      {
        "material": "iron-gear-wheel",
        "amount": 5
      },
      {
        "material": "electronic-circuit",
        "amount": 5
      },
      {
        "material": "pipe",
        "amount": 5
      }
    ]
  },
  {
    "id": "low-density-structure",
    "name": "Low density structure",
    "outputs": [
      {
        "material": "low-density-structure",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-plate",
        "amount": 2
      },
      {
        "material": "copper-plate",
        "amount": 20
      },
      {
        "material": "plastic-bar",
        "amount": 5
      }
    ]
  },
  {
    "id": "rocket-fuel",
    "name": "Rocket fuel",
    "outputs": [
      {
        "material": "rocket-fuel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "solid-fuel",
        "amount": 10
      },
      {
        "material": "light-oil",
        "amount": 10
      }
    ]
  },
  {
    "id": "rocket-part",
    "name": "Rocket part",
    "outputs": [
      {
        "material": "rocket-part",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "processing-unit",
        "amount": 1
      },
      {
        "material": "low-density-structure",
        "amount": 1
      },
      {
        "material": "rocket-fuel",
        "amount": 1
      }
    ]
  },
  {
    "id": "nuclear-reactor",
    "name": "Nuclear reactor",
    "outputs": [
      {
        "material": "nuclear-reactor",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "concrete",
        "amount": 500
      },
      {
        "material": "steel-plate",
        "amount": 500
      },
      {
        "material": "advanced-circuit",
        "amount": 500
      },
      {
        "material": "copper-plate",
        "amount": 500
      }
    ]
  },
  {
    "id": "centrifuge",
    "name": "Centrifuge",
    "outputs": [
      {
        "material": "centrifuge",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "concrete",
        "amount": 100
      },
      {
        "material": "steel-plate",
        "amount": 50
      },
      {
        "material": "advanced-circuit",
        "amount": 100
      },
      {
        "material": "iron-gear-wheel",
        "amount": 100
      }
    ]
  },
  {
    "id": "uranium-processing",
    "name": "Uranium processing",
    "outputs": [
      {
        "material": "uranium-235",
        "amount": 1
      },
      {
        "material": "uranium-238",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "uranium-ore",
        "amount": 10
      }
    ]
  },
  {
    "id": "kovarex-enrichment-process",
    "name": "Kovarex enrichment process",
    "outputs": [
      {
        "material": "uranium-235",
        "amount": 41
      },
      {
        "material": "uranium-238",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "uranium-235",
        "amount": 40
      },
      {
        "material": "uranium-238",
        "amount": 5
      }
    ],
    "alternate": true
  },
  {
    "id": "nuclear-fuel",
    "name": "Nuclear fuel",
    "outputs": [
      {
        "material": "nuclear-fuel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "uranium-235",
        "amount": 1
      },
      {
        "material": "rocket-fuel",
        "amount": 1
      }
    ]
  },
  {
    "id": "nuclear-fuel-reprocessing",
    "name": "Nuclear fuel reprocessing",
    "outputs": [
      {
        "material": "uranium-238",
        "amount": 3
      }
    ],
    "inputs": [
      {
        "material": "depleted-uranium-fuel-cell",
        "amount": 5
      }
    ]
  },
  {
    "id": "uranium-fuel-cell",
    "name": "Uranium fuel cell",
    "outputs": [
      {
        "material": "uranium-fuel-cell",
        "amount": 10
      }
    ],
    "inputs": [
      {
        "material": "iron-plate",
        "amount": 10
      },
      {
        "material": "uranium-235",
        "amount": 1
      },
      {
        "material": "uranium-238",
        "amount": 19
      }
    ]
  },
  {
    "id": "heat-exchanger",
    "name": "Heat exchanger",
    "outputs": [
      {
        "material": "heat-exchanger",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-plate",
        "amount": 10
      },
      {
        "material": "copper-plate",
        "amount": 100
      },
      {
        "material": "pipe",
        "amount": 10
      }
    ]
  },
  {
    "id": "heat-pipe",
    "name": "Heat pipe",
    "outputs": [
      {
        "material": "heat-pipe",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-plate",
        "amount": 10
      },
      {
        "material": "copper-plate",
        "amount": 20
      }
    ]
  },
  {
    "id": "steam-turbine",
    "name": "Steam turbine",
    "outputs": [
      {
        "material": "steam-turbine",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "iron-gear-wheel",
        "amount": 50
      },
      {
        "material": "copper-plate",
        "amount": 50
      },
      {
        "material": "pipe",
        "amount": 20
      }
    ]
  },
  {
    "id": "rail-support",
    "name": "Rail support",
    "outputs": [
      {
        "material": "rail-support",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "refined-concrete",
        "amount": 20
      },
      {
        "material": "steel-plate",
        "amount": 10
      }
    ]
  },
  {
    "id": "recycler",
    "name": "Recycler",
    "outputs": [
      {
        "material": "recycler",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "processing-unit",
        "amount": 6
      },
      {
        "material": "steel-plate",
        "amount": 20
      },
      {
        "material": "iron-gear-wheel",
        "amount": 40
      },
      {
        "material": "concrete",
        "amount": 20
      }
    ]
  },
  {
    "id": "simple-coal-liquefaction",
    "name": "Simple coal liquefaction",
    "outputs": [
      {
        "material": "heavy-oil",
        "amount": 50
      }
    ],
    "inputs": [
      {
        "material": "coal",
        "amount": 10
      },
      {
        "material": "calcite",
        "amount": 2
      },
      {
        "material": "sulfuric-acid",
        "amount": 25
      }
    ],
    "alternate": true
  },
  {
    "id": "copper-bacteria-cultivation",
    "name": "Copper bacteria cultivation",
    "outputs": [
      {
        "material": "copper-bacteria",
        "amount": 4
      }
    ],
    "inputs": [
      {
        "material": "copper-bacteria",
        "amount": 1
      }
    ],
    "spaceAge": true
  },
  {
    "id": "iron-bacteria-cultivation",
    "name": "Iron bacteria cultivation",
    "outputs": [
      {
        "material": "iron-bacteria",
        "amount": 4
      }
    ],
    "inputs": [
      {
        "material": "iron-bacteria",
        "amount": 1
      }
    ],
    "spaceAge": true
  },
  {
    "id": "artificial-yumako-soil",
    "name": "Artificial yumako soil",
    "outputs": [
      {
        "material": "artificial-yumako-soil",
        "amount": 10
      }
    ],
    "inputs": [
      {
        "material": "yumako-seed",
        "amount": 2
      },
      {
        "material": "nutrients",
        "amount": 50
      },
      {
        "material": "landfill",
        "amount": 5
      }
    ],
    "spaceAge": true
  },
  {
    "id": "overgrowth-yumako-soil",
    "name": "Overgrowth yumako soil",
    "outputs": [
      {
        "material": "overgrowth-yumako-soil",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "artificial-yumako-soil",
        "amount": 2
      },
      {
        "material": "yumako-seed",
        "amount": 5
      },
      {
        "material": "biter-egg",
        "amount": 10
      },
      {
        "material": "spoilage",
        "amount": 50
      },
      {
        "material": "water",
        "amount": 100
      }
    ],
    "spaceAge": true
  },
  {
    "id": "artificial-jellynut-soil",
    "name": "Artificial jellynut soil",
    "outputs": [
      {
        "material": "artificial-jellynut-soil",
        "amount": 10
      }
    ],
    "inputs": [
      {
        "material": "jellynut-seed",
        "amount": 2
      },
      {
        "material": "nutrients",
        "amount": 50
      },
      {
        "material": "landfill",
        "amount": 5
      }
    ],
    "spaceAge": true
  },
  {
    "id": "overgrowth-jellynut-soil",
    "name": "Overgrowth jellynut soil",
    "outputs": [
      {
        "material": "overgrowth-jellynut-soil",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "artificial-jellynut-soil",
        "amount": 2
      },
      {
        "material": "jellynut-seed",
        "amount": 5
      },
      {
        "material": "biter-egg",
        "amount": 10
      },
      {
        "material": "spoilage",
        "amount": 50
      },
      {
        "material": "water",
        "amount": 100
      }
    ],
    "spaceAge": true
  },
  {
    "id": "nutrients-from-spoilage",
    "name": "Nutrients from spoilage",
    "outputs": [
      {
        "material": "nutrients",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "spoilage",
        "amount": 10
      }
    ],
    "spaceAge": true
  },
  {
    "id": "pentapod-egg",
    "name": "Pentapod egg",
    "outputs": [
      {
        "material": "pentapod-egg",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "pentapod-egg",
        "amount": 1
      },
      {
        "material": "nutrients",
        "amount": 30
      },
      {
        "material": "water",
        "amount": 60
      }
    ],
    "spaceAge": true
  },
  {
    "id": "rocket-fuel-from-jelly",
    "name": "Rocket fuel from jelly",
    "outputs": [
      {
        "material": "rocket-fuel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "water",
        "amount": 30
      }
    ],
    "alternate": true
  },
  {
    "id": "biosulfur",
    "name": "Biosulfur",
    "outputs": [
      {
        "material": "sulfur",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "spoilage",
        "amount": 5
      }
    ],
    "alternate": true
  },
  {
    "id": "carbon-fiber",
    "name": "Carbon fiber",
    "outputs": [
      {
        "material": "carbon-fiber",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "carbon",
        "amount": 1
      }
    ],
    "spaceAge": true
  },
  {
    "id": "toolbelt-equipment",
    "name": "Toolbelt equipment",
    "outputs": [
      {
        "material": "toolbelt-equipment",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "advanced-circuit",
        "amount": 3
      },
      {
        "material": "carbon-fiber",
        "amount": 10
      }
    ],
    "spaceAge": true
  },
  {
    "id": "battery-mk3-equipment",
    "name": "Personal battery MK3",
    "outputs": [
      {
        "material": "battery-mk3-equipment",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "battery-mk2-equipment",
        "amount": 5
      },
      {
        "material": "supercapacitor",
        "amount": 10
      }
    ],
    "spaceAge": true
  },
  {
    "id": "space-platform-foundation",
    "name": "Space platform foundation",
    "outputs": [
      {
        "material": "space-platform-foundation",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-plate",
        "amount": 20
      },
      {
        "material": "copper-cable",
        "amount": 20
      }
    ],
    "spaceAge": true
  },
  {
    "id": "stack-inserter",
    "name": "Stack inserter",
    "outputs": [
      {
        "material": "stack-inserter",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "bulk-inserter",
        "amount": 1
      },
      {
        "material": "processing-unit",
        "amount": 1
      },
      {
        "material": "carbon-fiber",
        "amount": 2
      }
    ],
    "spaceAge": true
  },
  {
    "id": "rocket-turret",
    "name": "Rocket turret",
    "outputs": [
      {
        "material": "rocket-turret",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "processing-unit",
        "amount": 4
      },
      {
        "material": "carbon-fiber",
        "amount": 20
      },
      {
        "material": "steel-plate",
        "amount": 20
      },
      {
        "material": "iron-gear-wheel",
        "amount": 20
      }
    ],
    "spaceAge": true
  },
  {
    "id": "infinity-chest",
    "name": "Infinity chest",
    "outputs": [
      {
        "material": "infinity-chest",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-chest",
        "amount": 1
      },
      {
        "material": "electronic-circuit",
        "amount": 5
      }
    ]
  },
  {
    "id": "infinity-pipe",
    "name": "Infinity pipe",
    "outputs": [
      {
        "material": "infinity-pipe",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "pipe",
        "amount": 1
      },
      {
        "material": "electronic-circuit",
        "amount": 5
      }
    ]
  },
  {
    "id": "heat-interface",
    "name": "Heat interface",
    "outputs": [
      {
        "material": "heat-interface",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "heat-pipe",
        "amount": 1
      },
      {
        "material": "electronic-circuit",
        "amount": 5
      }
    ]
  },
  {
    "id": "cargo-bay",
    "name": "Cargo bay",
    "outputs": [
      {
        "material": "cargo-bay",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-plate",
        "amount": 20
      },
      {
        "material": "low-density-structure",
        "amount": 20
      },
      {
        "material": "processing-unit",
        "amount": 5
      }
    ],
    "spaceAge": true
  },
  {
    "id": "landing-pad-unloading-bay",
    "name": "Landing pad unloading bay",
    "outputs": [
      {
        "material": "landing-pad-unloading-bay",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "cargo-bay",
        "amount": 1
      },
      {
        "material": "steel-chest",
        "amount": 4
      },
      {
        "material": "electric-engine-unit",
        "amount": 15
      },
      {
        "material": "processing-unit",
        "amount": 8
      }
    ],
    "spaceAge": true
  },
  {
    "id": "asteroid-collector",
    "name": "Asteroid collector",
    "outputs": [
      {
        "material": "asteroid-collector",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "low-density-structure",
        "amount": 20
      },
      {
        "material": "electric-engine-unit",
        "amount": 8
      },
      {
        "material": "processing-unit",
        "amount": 5
      }
    ],
    "spaceAge": true
  },
  {
    "id": "crusher",
    "name": "Crusher",
    "outputs": [
      {
        "material": "crusher",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "low-density-structure",
        "amount": 20
      },
      {
        "material": "steel-plate",
        "amount": 10
      },
      {
        "material": "electric-engine-unit",
        "amount": 10
      }
    ],
    "spaceAge": true
  },
  {
    "id": "thruster",
    "name": "Thruster",
    "outputs": [
      {
        "material": "thruster",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-plate",
        "amount": 10
      },
      {
        "material": "processing-unit",
        "amount": 10
      },
      {
        "material": "electric-engine-unit",
        "amount": 5
      }
    ],
    "spaceAge": true
  },
  {
    "id": "space-science-pack",
    "name": "Space science pack",
    "outputs": [
      {
        "material": "space-science-pack",
        "amount": 5
      }
    ],
    "inputs": [
      {
        "material": "iron-plate",
        "amount": 2
      },
      {
        "material": "carbon",
        "amount": 1
      },
      {
        "material": "ice",
        "amount": 1
      }
    ]
  },
  {
    "id": "metallurgic-science-pack",
    "name": "Metallurgic science pack",
    "outputs": [
      {
        "material": "metallurgic-science-pack",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "tungsten-carbide",
        "amount": 3
      },
      {
        "material": "tungsten-plate",
        "amount": 2
      },
      {
        "material": "molten-copper",
        "amount": 200
      }
    ],
    "spaceAge": true
  },
  {
    "id": "agricultural-science-pack",
    "name": "Agricultural science pack",
    "outputs": [
      {
        "material": "agricultural-science-pack",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "pentapod-egg",
        "amount": 1
      }
    ],
    "spaceAge": true
  },
  {
    "id": "electromagnetic-science-pack",
    "name": "Electromagnetic science pack",
    "outputs": [
      {
        "material": "electromagnetic-science-pack",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "supercapacitor",
        "amount": 1
      },
      {
        "material": "accumulator",
        "amount": 1
      },
      {
        "material": "electrolyte",
        "amount": 25
      },
      {
        "material": "holmium-solution",
        "amount": 25
      }
    ],
    "spaceAge": true
  },
  {
    "id": "cryogenic-science-pack",
    "name": "Cryogenic science pack",
    "outputs": [
      {
        "material": "cryogenic-science-pack",
        "amount": 1
      },
      {
        "material": "fluoroketone-hot",
        "amount": 3
      }
    ],
    "inputs": [
      {
        "material": "ice",
        "amount": 3
      },
      {
        "material": "lithium-plate",
        "amount": 1
      },
      {
        "material": "fluoroketone-cold",
        "amount": 6
      }
    ],
    "spaceAge": true
  },
  {
    "id": "metallic-asteroid-crushing",
    "name": "Metallic asteroid crushing",
    "outputs": [
      {
        "material": "iron-ore",
        "amount": 20
      },
      {
        "material": "metallic-asteroid-chunk",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "metallic-asteroid-chunk",
        "amount": 1
      }
    ]
  },
  {
    "id": "carbonic-asteroid-crushing",
    "name": "Carbonic asteroid crushing",
    "outputs": [
      {
        "material": "carbon",
        "amount": 10
      },
      {
        "material": "carbonic-asteroid-chunk",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "carbonic-asteroid-chunk",
        "amount": 1
      }
    ],
    "spaceAge": true
  },
  {
    "id": "oxide-asteroid-crushing",
    "name": "Oxide asteroid crushing",
    "outputs": [
      {
        "material": "ice",
        "amount": 5
      },
      {
        "material": "oxide-asteroid-chunk",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "oxide-asteroid-chunk",
        "amount": 1
      }
    ],
    "spaceAge": true
  },
  {
    "id": "advanced-metallic-asteroid-crushing",
    "name": "Advanced metallic asteroid crushing",
    "outputs": [
      {
        "material": "iron-ore",
        "amount": 10
      },
      {
        "material": "copper-ore",
        "amount": 4
      },
      {
        "material": "metallic-asteroid-chunk",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "metallic-asteroid-chunk",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "advanced-carbonic-asteroid-crushing",
    "name": "Advanced carbonic asteroid crushing",
    "outputs": [
      {
        "material": "carbon",
        "amount": 5
      },
      {
        "material": "sulfur",
        "amount": 2
      },
      {
        "material": "carbonic-asteroid-chunk",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "carbonic-asteroid-chunk",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "advanced-oxide-asteroid-crushing",
    "name": "Advanced oxide asteroid crushing",
    "outputs": [
      {
        "material": "ice",
        "amount": 3
      },
      {
        "material": "calcite",
        "amount": 2
      },
      {
        "material": "oxide-asteroid-chunk",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "oxide-asteroid-chunk",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "metallic-asteroid-reprocessing",
    "name": "Metallic asteroid reprocessing",
    "outputs": [
      {
        "material": "metallic-asteroid-chunk",
        "amount": 1
      },
      {
        "material": "carbonic-asteroid-chunk",
        "amount": 1
      },
      {
        "material": "oxide-asteroid-chunk",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "metallic-asteroid-chunk",
        "amount": 1
      }
    ],
    "spaceAge": true
  },
  {
    "id": "carbonic-asteroid-reprocessing",
    "name": "Carbonic asteroid reprocessing",
    "outputs": [
      {
        "material": "carbonic-asteroid-chunk",
        "amount": 1
      },
      {
        "material": "metallic-asteroid-chunk",
        "amount": 1
      },
      {
        "material": "oxide-asteroid-chunk",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "carbonic-asteroid-chunk",
        "amount": 1
      }
    ],
    "spaceAge": true
  },
  {
    "id": "oxide-asteroid-reprocessing",
    "name": "Oxide asteroid reprocessing",
    "outputs": [
      {
        "material": "oxide-asteroid-chunk",
        "amount": 1
      },
      {
        "material": "metallic-asteroid-chunk",
        "amount": 1
      },
      {
        "material": "carbonic-asteroid-chunk",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "oxide-asteroid-chunk",
        "amount": 1
      }
    ],
    "spaceAge": true
  },
  {
    "id": "thruster-fuel",
    "name": "Thruster fuel",
    "outputs": [
      {
        "material": "thruster-fuel",
        "amount": 75
      }
    ],
    "inputs": [
      {
        "material": "carbon",
        "amount": 2
      },
      {
        "material": "water",
        "amount": 10
      }
    ]
  },
  {
    "id": "thruster-oxidizer",
    "name": "Thruster oxidizer",
    "outputs": [
      {
        "material": "thruster-oxidizer",
        "amount": 75
      }
    ],
    "inputs": [
      {
        "material": "iron-ore",
        "amount": 2
      },
      {
        "material": "water",
        "amount": 10
      }
    ]
  },
  {
    "id": "ice-melting",
    "name": "Ice melting",
    "outputs": [
      {
        "material": "water",
        "amount": 20
      }
    ],
    "inputs": [
      {
        "material": "ice",
        "amount": 1
      }
    ]
  },
  {
    "id": "advanced-thruster-fuel",
    "name": "Advanced thruster fuel",
    "outputs": [
      {
        "material": "thruster-fuel",
        "amount": 1500
      }
    ],
    "inputs": [
      {
        "material": "carbon",
        "amount": 2
      },
      {
        "material": "calcite",
        "amount": 1
      },
      {
        "material": "water",
        "amount": 100
      }
    ],
    "alternate": true
  },
  {
    "id": "advanced-thruster-oxidizer",
    "name": "Advanced thruster oxidizer",
    "outputs": [
      {
        "material": "thruster-oxidizer",
        "amount": 1500
      }
    ],
    "inputs": [
      {
        "material": "iron-ore",
        "amount": 2
      },
      {
        "material": "calcite",
        "amount": 1
      },
      {
        "material": "water",
        "amount": 100
      }
    ],
    "alternate": true
  },
  {
    "id": "acid-neutralisation",
    "name": "Acid neutralisation",
    "outputs": [
      {
        "material": "steam",
        "amount": 1000
      }
    ],
    "inputs": [
      {
        "material": "calcite",
        "amount": 1
      },
      {
        "material": "sulfuric-acid",
        "amount": 100
      }
    ]
  },
  {
    "id": "steam-condensation",
    "name": "Steam condensation",
    "outputs": [
      {
        "material": "water",
        "amount": 90
      }
    ],
    "inputs": [
      {
        "material": "steam",
        "amount": 1000
      }
    ],
    "alternate": true
  },
  {
    "id": "carbon",
    "name": "Carbon",
    "outputs": [
      {
        "material": "carbon",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "coal",
        "amount": 2
      },
      {
        "material": "sulfuric-acid",
        "amount": 20
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "tungsten-carbide",
    "name": "Tungsten carbide",
    "outputs": [
      {
        "material": "tungsten-carbide",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "tungsten-ore",
        "amount": 2
      },
      {
        "material": "sulfuric-acid",
        "amount": 10
      },
      {
        "material": "carbon",
        "amount": 1
      }
    ],
    "spaceAge": true
  },
  {
    "id": "foundry",
    "name": "Foundry",
    "outputs": [
      {
        "material": "foundry",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "tungsten-carbide",
        "amount": 50
      },
      {
        "material": "steel-plate",
        "amount": 50
      },
      {
        "material": "electronic-circuit",
        "amount": 30
      },
      {
        "material": "refined-concrete",
        "amount": 20
      },
      {
        "material": "lubricant",
        "amount": 20
      }
    ],
    "spaceAge": true
  },
  {
    "id": "molten-iron-from-lava",
    "name": "Molten iron from lava",
    "outputs": [
      {
        "material": "molten-iron",
        "amount": 250
      },
      {
        "material": "stone",
        "amount": 10
      }
    ],
    "inputs": [
      {
        "material": "lava",
        "amount": 500
      },
      {
        "material": "calcite",
        "amount": 1
      }
    ]
  },
  {
    "id": "molten-copper-from-lava",
    "name": "Molten copper from lava",
    "outputs": [
      {
        "material": "molten-copper",
        "amount": 250
      },
      {
        "material": "stone",
        "amount": 15
      }
    ],
    "inputs": [
      {
        "material": "lava",
        "amount": 500
      },
      {
        "material": "calcite",
        "amount": 1
      }
    ]
  },
  {
    "id": "iron-ore-melting",
    "name": "Iron ore melting",
    "outputs": [
      {
        "material": "molten-iron",
        "amount": 500
      }
    ],
    "inputs": [
      {
        "material": "iron-ore",
        "amount": 50
      },
      {
        "material": "calcite",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "copper-ore-melting",
    "name": "Copper ore melting",
    "outputs": [
      {
        "material": "molten-copper",
        "amount": 500
      }
    ],
    "inputs": [
      {
        "material": "copper-ore",
        "amount": 50
      },
      {
        "material": "calcite",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "casting-iron",
    "name": "Casting iron",
    "outputs": [
      {
        "material": "iron-plate",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "molten-iron",
        "amount": 20
      }
    ],
    "alternate": true
  },
  {
    "id": "casting-steel",
    "name": "Casting steel",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "molten-iron",
        "amount": 30
      }
    ],
    "alternate": true
  },
  {
    "id": "casting-copper",
    "name": "Casting copper",
    "outputs": [
      {
        "material": "copper-plate",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "molten-copper",
        "amount": 20
      }
    ],
    "alternate": true
  },
  {
    "id": "casting-iron-gear-wheel",
    "name": "Casting iron gear wheel",
    "outputs": [
      {
        "material": "iron-gear-wheel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "molten-iron",
        "amount": 10
      }
    ],
    "alternate": true
  },
  {
    "id": "casting-iron-stick",
    "name": "Casting iron stick",
    "outputs": [
      {
        "material": "iron-stick",
        "amount": 4
      }
    ],
    "inputs": [
      {
        "material": "molten-iron",
        "amount": 20
      }
    ],
    "alternate": true
  },
  {
    "id": "casting-pipe",
    "name": "Casting pipe",
    "outputs": [
      {
        "material": "pipe",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "molten-iron",
        "amount": 10
      }
    ],
    "alternate": true
  },
  {
    "id": "casting-pipe-to-ground",
    "name": "Casting pipe to ground",
    "outputs": [
      {
        "material": "pipe-to-ground",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "molten-iron",
        "amount": 50
      },
      {
        "material": "pipe",
        "amount": 10
      }
    ],
    "alternate": true
  },
  {
    "id": "casting-low-density-structure",
    "name": "Casting low density structure",
    "outputs": [
      {
        "material": "low-density-structure",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "molten-iron",
        "amount": 80
      },
      {
        "material": "molten-copper",
        "amount": 250
      },
      {
        "material": "plastic-bar",
        "amount": 5
      }
    ],
    "alternate": true
  },
  {
    "id": "concrete-from-molten-iron",
    "name": "Concrete from molten iron",
    "outputs": [
      {
        "material": "concrete",
        "amount": 10
      }
    ],
    "inputs": [
      {
        "material": "molten-iron",
        "amount": 20
      },
      {
        "material": "water",
        "amount": 100
      },
      {
        "material": "stone-brick",
        "amount": 5
      }
    ],
    "alternate": true
  },
  {
    "id": "casting-copper-cable",
    "name": "Casting copper cable",
    "outputs": [
      {
        "material": "copper-cable",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "molten-copper",
        "amount": 5
      }
    ],
    "alternate": true
  },
  {
    "id": "tungsten-plate",
    "name": "Tungsten plate",
    "outputs": [
      {
        "material": "tungsten-plate",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "tungsten-ore",
        "amount": 4
      },
      {
        "material": "molten-iron",
        "amount": 10
      }
    ],
    "spaceAge": true
  },
  {
    "id": "turbo-transport-belt",
    "name": "Turbo transport belt",
    "outputs": [
      {
        "material": "turbo-transport-belt",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "tungsten-plate",
        "amount": 5
      },
      {
        "material": "express-transport-belt",
        "amount": 1
      },
      {
        "material": "lubricant",
        "amount": 20
      }
    ],
    "spaceAge": true
  },
  {
    "id": "turbo-underground-belt",
    "name": "Turbo underground belt",
    "outputs": [
      {
        "material": "turbo-underground-belt",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "tungsten-plate",
        "amount": 40
      },
      {
        "material": "express-underground-belt",
        "amount": 2
      },
      {
        "material": "lubricant",
        "amount": 40
      }
    ],
    "spaceAge": true
  },
  {
    "id": "turbo-splitter",
    "name": "Turbo splitter",
    "outputs": [
      {
        "material": "turbo-splitter",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "express-splitter",
        "amount": 1
      },
      {
        "material": "tungsten-plate",
        "amount": 15
      },
      {
        "material": "processing-unit",
        "amount": 2
      },
      {
        "material": "lubricant",
        "amount": 80
      }
    ],
    "spaceAge": true
  },
  {
    "id": "turbo-loader",
    "name": "Turbo loader",
    "outputs": [
      {
        "material": "turbo-loader",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "turbo-transport-belt",
        "amount": 5
      },
      {
        "material": "express-loader",
        "amount": 1
      }
    ],
    "spaceAge": true
  },
  {
    "id": "big-mining-drill",
    "name": "Big mining drill",
    "outputs": [
      {
        "material": "big-mining-drill",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "electric-mining-drill",
        "amount": 1
      },
      {
        "material": "molten-iron",
        "amount": 200
      },
      {
        "material": "tungsten-carbide",
        "amount": 20
      },
      {
        "material": "electric-engine-unit",
        "amount": 10
      },
      {
        "material": "advanced-circuit",
        "amount": 10
      }
    ],
    "spaceAge": true
  },
  {
    "id": "railgun-turret",
    "name": "Railgun turret",
    "outputs": [
      {
        "material": "railgun-turret",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "quantum-processor",
        "amount": 100
      },
      {
        "material": "tungsten-plate",
        "amount": 30
      },
      {
        "material": "superconductor",
        "amount": 50
      },
      {
        "material": "carbon-fiber",
        "amount": 20
      },
      {
        "material": "fluoroketone-cold",
        "amount": 100
      }
    ],
    "spaceAge": true
  },
  {
    "id": "agricultural-tower",
    "name": "Agricultural tower",
    "outputs": [
      {
        "material": "agricultural-tower",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-plate",
        "amount": 10
      },
      {
        "material": "electronic-circuit",
        "amount": 3
      },
      {
        "material": "spoilage",
        "amount": 20
      },
      {
        "material": "landfill",
        "amount": 1
      }
    ],
    "spaceAge": true
  },
  {
    "id": "biochamber",
    "name": "Biochamber",
    "outputs": [
      {
        "material": "biochamber",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "nutrients",
        "amount": 5
      },
      {
        "material": "pentapod-egg",
        "amount": 1
      },
      {
        "material": "iron-plate",
        "amount": 20
      },
      {
        "material": "electronic-circuit",
        "amount": 5
      },
      {
        "material": "landfill",
        "amount": 1
      }
    ],
    "spaceAge": true
  },
  {
    "id": "burnt-spoilage",
    "name": "Burnt spoilage",
    "outputs": [
      {
        "material": "carbon",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "spoilage",
        "amount": 6
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "coal-synthesis",
    "name": "Coal synthesis",
    "outputs": [
      {
        "material": "coal",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "carbon",
        "amount": 5
      },
      {
        "material": "sulfur",
        "amount": 1
      },
      {
        "material": "water",
        "amount": 10
      }
    ]
  },
  {
    "id": "biolab",
    "name": "Biolab",
    "outputs": [
      {
        "material": "biolab",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "lab",
        "amount": 1
      },
      {
        "material": "biter-egg",
        "amount": 10
      },
      {
        "material": "refined-concrete",
        "amount": 25
      },
      {
        "material": "uranium-235",
        "amount": 3
      }
    ],
    "spaceAge": true
  },
  {
    "id": "captive-biter-spawner",
    "name": "Captive biter spawner",
    "outputs": [
      {
        "material": "captive-biter-spawner",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "biter-egg",
        "amount": 10
      },
      {
        "material": "uranium-235",
        "amount": 15
      },
      {
        "material": "fluoroketone-cold",
        "amount": 100
      }
    ],
    "spaceAge": true
  },
  {
    "id": "nutrients-from-biter-egg",
    "name": "Nutrients from biter egg",
    "outputs": [
      {
        "material": "nutrients",
        "amount": 20
      }
    ],
    "inputs": [
      {
        "material": "biter-egg",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "scrap-recycling",
    "name": "Scrap recycling",
    "outputs": [
      {
        "material": "iron-gear-wheel",
        "amount": 1
      },
      {
        "material": "solid-fuel",
        "amount": 1
      },
      {
        "material": "concrete",
        "amount": 1
      },
      {
        "material": "ice",
        "amount": 1
      },
      {
        "material": "steel-plate",
        "amount": 1
      },
      {
        "material": "battery",
        "amount": 1
      },
      {
        "material": "stone",
        "amount": 1
      },
      {
        "material": "advanced-circuit",
        "amount": 1
      },
      {
        "material": "copper-cable",
        "amount": 1
      },
      {
        "material": "processing-unit",
        "amount": 1
      },
      {
        "material": "low-density-structure",
        "amount": 1
      },
      {
        "material": "holmium-ore",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "scrap",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "lightning-rod",
    "name": "Lightning rod",
    "outputs": [
      {
        "material": "lightning-rod",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "copper-cable",
        "amount": 12
      },
      {
        "material": "steel-plate",
        "amount": 8
      },
      {
        "material": "stone-brick",
        "amount": 4
      }
    ],
    "spaceAge": true
  },
  {
    "id": "holmium-solution",
    "name": "Holmium solution",
    "outputs": [
      {
        "material": "holmium-solution",
        "amount": 100
      }
    ],
    "inputs": [
      {
        "material": "holmium-ore",
        "amount": 2
      },
      {
        "material": "stone",
        "amount": 1
      },
      {
        "material": "water",
        "amount": 10
      }
    ]
  },
  {
    "id": "holmium-plate",
    "name": "Holmium plate",
    "outputs": [
      {
        "material": "holmium-plate",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "holmium-solution",
        "amount": 20
      }
    ],
    "spaceAge": true
  },
  {
    "id": "electromagnetic-plant",
    "name": "Electromagnetic plant",
    "outputs": [
      {
        "material": "electromagnetic-plant",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "holmium-plate",
        "amount": 150
      },
      {
        "material": "steel-plate",
        "amount": 50
      },
      {
        "material": "processing-unit",
        "amount": 50
      },
      {
        "material": "refined-concrete",
        "amount": 50
      }
    ],
    "spaceAge": true
  },
  {
    "id": "superconductor",
    "name": "Superconductor",
    "outputs": [
      {
        "material": "superconductor",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "holmium-plate",
        "amount": 1
      },
      {
        "material": "copper-plate",
        "amount": 1
      },
      {
        "material": "plastic-bar",
        "amount": 1
      },
      {
        "material": "light-oil",
        "amount": 5
      }
    ],
    "spaceAge": true
  },
  {
    "id": "supercapacitor",
    "name": "Supercapacitor",
    "outputs": [
      {
        "material": "supercapacitor",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "holmium-plate",
        "amount": 2
      },
      {
        "material": "superconductor",
        "amount": 2
      },
      {
        "material": "electronic-circuit",
        "amount": 4
      },
      {
        "material": "battery",
        "amount": 1
      },
      {
        "material": "electrolyte",
        "amount": 10
      }
    ],
    "spaceAge": true
  },
  {
    "id": "electrolyte",
    "name": "Electrolyte",
    "outputs": [
      {
        "material": "electrolyte",
        "amount": 10
      }
    ],
    "inputs": [
      {
        "material": "stone",
        "amount": 1
      },
      {
        "material": "heavy-oil",
        "amount": 10
      },
      {
        "material": "holmium-solution",
        "amount": 10
      }
    ]
  },
  {
    "id": "lightning-collector",
    "name": "Lightning collector",
    "outputs": [
      {
        "material": "lightning-collector",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "lightning-rod",
        "amount": 1
      },
      {
        "material": "supercapacitor",
        "amount": 8
      },
      {
        "material": "accumulator",
        "amount": 1
      },
      {
        "material": "electrolyte",
        "amount": 80
      }
    ],
    "spaceAge": true
  },
  {
    "id": "tesla-turret",
    "name": "Tesla turret",
    "outputs": [
      {
        "material": "tesla-turret",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "supercapacitor",
        "amount": 10
      },
      {
        "material": "processing-unit",
        "amount": 10
      },
      {
        "material": "superconductor",
        "amount": 50
      },
      {
        "material": "electrolyte",
        "amount": 500
      }
    ],
    "spaceAge": true
  },
  {
    "id": "heating-tower",
    "name": "Heating tower",
    "outputs": [
      {
        "material": "heating-tower",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "boiler",
        "amount": 2
      },
      {
        "material": "heat-pipe",
        "amount": 5
      },
      {
        "material": "concrete",
        "amount": 20
      }
    ],
    "spaceAge": true
  },
  {
    "id": "lithium",
    "name": "Lithium",
    "outputs": [
      {
        "material": "lithium",
        "amount": 5
      }
    ],
    "inputs": [
      {
        "material": "holmium-plate",
        "amount": 1
      },
      {
        "material": "lithium-brine",
        "amount": 50
      },
      {
        "material": "ammonia",
        "amount": 50
      }
    ],
    "spaceAge": true
  },
  {
    "id": "lithium-plate",
    "name": "Lithium plate",
    "outputs": [
      {
        "material": "lithium-plate",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "lithium",
        "amount": 1
      }
    ],
    "spaceAge": true
  },
  {
    "id": "fluoroketone",
    "name": "Fluoroketone",
    "outputs": [
      {
        "material": "fluoroketone-hot",
        "amount": 50
      }
    ],
    "inputs": [
      {
        "material": "fluorine",
        "amount": 50
      },
      {
        "material": "ammonia",
        "amount": 50
      },
      {
        "material": "solid-fuel",
        "amount": 1
      },
      {
        "material": "lithium",
        "amount": 1
      }
    ]
  },
  {
    "id": "fluoroketone-cooling",
    "name": "Cooling hot fluoroketone",
    "outputs": [
      {
        "material": "fluoroketone-cold",
        "amount": 10
      }
    ],
    "inputs": [
      {
        "material": "fluoroketone-hot",
        "amount": 10
      }
    ]
  },
  {
    "id": "cryogenic-plant",
    "name": "Cryogenic plant",
    "outputs": [
      {
        "material": "cryogenic-plant",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "refined-concrete",
        "amount": 40
      },
      {
        "material": "superconductor",
        "amount": 20
      },
      {
        "material": "processing-unit",
        "amount": 20
      },
      {
        "material": "lithium-plate",
        "amount": 20
      }
    ],
    "spaceAge": true
  },
  {
    "id": "quantum-processor",
    "name": "Quantum processor",
    "outputs": [
      {
        "material": "quantum-processor",
        "amount": 1
      },
      {
        "material": "fluoroketone-hot",
        "amount": 5
      }
    ],
    "inputs": [
      {
        "material": "tungsten-carbide",
        "amount": 1
      },
      {
        "material": "processing-unit",
        "amount": 1
      },
      {
        "material": "superconductor",
        "amount": 1
      },
      {
        "material": "carbon-fiber",
        "amount": 1
      },
      {
        "material": "lithium-plate",
        "amount": 2
      },
      {
        "material": "fluoroketone-cold",
        "amount": 10
      }
    ],
    "spaceAge": true
  },
  {
    "id": "ammoniacal-solution-separation",
    "name": "Ammoniacal solution separation",
    "outputs": [
      {
        "material": "ice",
        "amount": 5
      },
      {
        "material": "ammonia",
        "amount": 50
      }
    ],
    "inputs": [
      {
        "material": "ammoniacal-solution",
        "amount": 50
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "fusion-reactor-equipment",
    "name": "Portable fusion reactor",
    "outputs": [
      {
        "material": "fusion-reactor-equipment",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "fission-reactor-equipment",
        "amount": 1
      },
      {
        "material": "fusion-power-cell",
        "amount": 10
      },
      {
        "material": "tungsten-plate",
        "amount": 250
      },
      {
        "material": "carbon-fiber",
        "amount": 100
      },
      {
        "material": "supercapacitor",
        "amount": 25
      },
      {
        "material": "quantum-processor",
        "amount": 250
      }
    ],
    "spaceAge": true
  },
  {
    "id": "fusion-power-cell",
    "name": "Fusion power cell",
    "outputs": [
      {
        "material": "fusion-power-cell",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "lithium-plate",
        "amount": 5
      },
      {
        "material": "holmium-plate",
        "amount": 1
      },
      {
        "material": "ammonia",
        "amount": 100
      }
    ],
    "spaceAge": true
  },
  {
    "id": "fusion-reactor",
    "name": "Fusion reactor",
    "outputs": [
      {
        "material": "fusion-reactor",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "tungsten-plate",
        "amount": 200
      },
      {
        "material": "superconductor",
        "amount": 200
      },
      {
        "material": "quantum-processor",
        "amount": 250
      }
    ],
    "spaceAge": true
  },
  {
    "id": "fusion-generator",
    "name": "Fusion generator",
    "outputs": [
      {
        "material": "fusion-generator",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "tungsten-plate",
        "amount": 100
      },
      {
        "material": "superconductor",
        "amount": 100
      },
      {
        "material": "quantum-processor",
        "amount": 50
      }
    ],
    "spaceAge": true
  },
  {
    "id": "ice-platform",
    "name": "Ice platform",
    "outputs": [
      {
        "material": "ice-platform",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "ammonia",
        "amount": 400
      },
      {
        "material": "ice",
        "amount": 50
      }
    ],
    "spaceAge": true
  },
  {
    "id": "solid-fuel-from-ammonia",
    "name": "Solid fuel from ammonia",
    "outputs": [
      {
        "material": "solid-fuel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "ammonia",
        "amount": 15
      },
      {
        "material": "crude-oil",
        "amount": 6
      }
    ],
    "alternate": true
  },
  {
    "id": "ammonia-rocket-fuel",
    "name": "Ammonia rocket fuel",
    "outputs": [
      {
        "material": "rocket-fuel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "solid-fuel",
        "amount": 10
      },
      {
        "material": "water",
        "amount": 50
      },
      {
        "material": "ammonia",
        "amount": 500
      }
    ],
    "alternate": true
  },
  {
    "id": "foundation",
    "name": "Foundation",
    "outputs": [
      {
        "material": "foundation",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "tungsten-plate",
        "amount": 4
      },
      {
        "material": "lithium-plate",
        "amount": 4
      },
      {
        "material": "carbon-fiber",
        "amount": 4
      },
      {
        "material": "stone",
        "amount": 20
      },
      {
        "material": "fluoroketone-cold",
        "amount": 20
      }
    ],
    "spaceAge": true
  },
  {
    "id": "promethium-science-pack",
    "name": "Promethium science pack",
    "outputs": [
      {
        "material": "promethium-science-pack",
        "amount": 10
      }
    ],
    "inputs": [
      {
        "material": "promethium-asteroid-chunk",
        "amount": 25
      },
      {
        "material": "quantum-processor",
        "amount": 1
      },
      {
        "material": "biter-egg",
        "amount": 10
      }
    ],
    "spaceAge": true
  },
  {
    "id": "tree-seed",
    "name": "Tree seed",
    "outputs": [
      {
        "material": "tree-seed",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "wood",
        "amount": 2
      }
    ],
    "spaceAge": true
  },
  {
    "id": "water-barrel",
    "name": "Fill Water barrel",
    "outputs": [
      {
        "material": "water-barrel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "water",
        "amount": 50
      },
      {
        "material": "barrel",
        "amount": 1
      }
    ]
  },
  {
    "id": "empty-water-barrel",
    "name": "Empty Water barrel",
    "outputs": [
      {
        "material": "water",
        "amount": 50
      },
      {
        "material": "barrel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "water-barrel",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "sulfuric-acid-barrel",
    "name": "Fill Sulfuric acid barrel",
    "outputs": [
      {
        "material": "sulfuric-acid-barrel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "sulfuric-acid",
        "amount": 50
      },
      {
        "material": "barrel",
        "amount": 1
      }
    ]
  },
  {
    "id": "empty-sulfuric-acid-barrel",
    "name": "Empty Sulfuric acid barrel",
    "outputs": [
      {
        "material": "sulfuric-acid",
        "amount": 50
      },
      {
        "material": "barrel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "sulfuric-acid-barrel",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "crude-oil-barrel",
    "name": "Fill Crude oil barrel",
    "outputs": [
      {
        "material": "crude-oil-barrel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "crude-oil",
        "amount": 50
      },
      {
        "material": "barrel",
        "amount": 1
      }
    ]
  },
  {
    "id": "empty-crude-oil-barrel",
    "name": "Empty Crude oil barrel",
    "outputs": [
      {
        "material": "crude-oil",
        "amount": 50
      },
      {
        "material": "barrel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "crude-oil-barrel",
        "amount": 1
      }
    ]
  },
  {
    "id": "heavy-oil-barrel",
    "name": "Fill Heavy oil barrel",
    "outputs": [
      {
        "material": "heavy-oil-barrel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "heavy-oil",
        "amount": 50
      },
      {
        "material": "barrel",
        "amount": 1
      }
    ]
  },
  {
    "id": "empty-heavy-oil-barrel",
    "name": "Empty Heavy oil barrel",
    "outputs": [
      {
        "material": "heavy-oil",
        "amount": 50
      },
      {
        "material": "barrel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "heavy-oil-barrel",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "light-oil-barrel",
    "name": "Fill Light oil barrel",
    "outputs": [
      {
        "material": "light-oil-barrel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "light-oil",
        "amount": 50
      },
      {
        "material": "barrel",
        "amount": 1
      }
    ]
  },
  {
    "id": "empty-light-oil-barrel",
    "name": "Empty Light oil barrel",
    "outputs": [
      {
        "material": "light-oil",
        "amount": 50
      },
      {
        "material": "barrel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "light-oil-barrel",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "petroleum-gas-barrel",
    "name": "Fill Petroleum gas barrel",
    "outputs": [
      {
        "material": "petroleum-gas-barrel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "petroleum-gas",
        "amount": 50
      },
      {
        "material": "barrel",
        "amount": 1
      }
    ]
  },
  {
    "id": "empty-petroleum-gas-barrel",
    "name": "Empty Petroleum gas barrel",
    "outputs": [
      {
        "material": "petroleum-gas",
        "amount": 50
      },
      {
        "material": "barrel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "petroleum-gas-barrel",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "lubricant-barrel",
    "name": "Fill Lubricant barrel",
    "outputs": [
      {
        "material": "lubricant-barrel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "lubricant",
        "amount": 50
      },
      {
        "material": "barrel",
        "amount": 1
      }
    ]
  },
  {
    "id": "empty-lubricant-barrel",
    "name": "Empty Lubricant barrel",
    "outputs": [
      {
        "material": "lubricant",
        "amount": 50
      },
      {
        "material": "barrel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "lubricant-barrel",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "fluoroketone-cold-barrel",
    "name": "Fill Fluoroketone (Cold) barrel",
    "outputs": [
      {
        "material": "fluoroketone-cold-barrel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "fluoroketone-cold",
        "amount": 50
      },
      {
        "material": "barrel",
        "amount": 1
      }
    ]
  },
  {
    "id": "empty-fluoroketone-cold-barrel",
    "name": "Empty Fluoroketone (Cold) barrel",
    "outputs": [
      {
        "material": "fluoroketone-cold",
        "amount": 50
      },
      {
        "material": "barrel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "fluoroketone-cold-barrel",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "fluoroketone-hot-barrel",
    "name": "Fill Fluoroketone (Hot) barrel",
    "outputs": [
      {
        "material": "fluoroketone-hot-barrel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "fluoroketone-hot",
        "amount": 50
      },
      {
        "material": "barrel",
        "amount": 1
      }
    ]
  },
  {
    "id": "empty-fluoroketone-hot-barrel",
    "name": "Empty Fluoroketone (Hot) barrel",
    "outputs": [
      {
        "material": "fluoroketone-hot",
        "amount": 50
      },
      {
        "material": "barrel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "fluoroketone-hot-barrel",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "bulk-inserter-recycling",
    "name": "Bulk inserter recycling",
    "outputs": [
      {
        "material": "iron-gear-wheel",
        "amount": 3
      },
      {
        "material": "electronic-circuit",
        "amount": 3
      },
      {
        "material": "advanced-circuit",
        "amount": 0
      },
      {
        "material": "fast-inserter",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "bulk-inserter",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "barrel-recycling",
    "name": "Barrel recycling",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "barrel",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "night-vision-equipment-recycling",
    "name": "Nightvision recycling",
    "outputs": [
      {
        "material": "advanced-circuit",
        "amount": 1
      },
      {
        "material": "steel-plate",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "night-vision-equipment",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "belt-immunity-equipment-recycling",
    "name": "Belt immunity equipment recycling",
    "outputs": [
      {
        "material": "advanced-circuit",
        "amount": 1
      },
      {
        "material": "steel-plate",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "belt-immunity-equipment",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "energy-shield-equipment-recycling",
    "name": "Energy shield recycling",
    "outputs": [
      {
        "material": "advanced-circuit",
        "amount": 1
      },
      {
        "material": "steel-plate",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "energy-shield-equipment",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "energy-shield-mk2-equipment-recycling",
    "name": "Energy shield MK2 recycling",
    "outputs": [
      {
        "material": "energy-shield-equipment",
        "amount": 2
      },
      {
        "material": "processing-unit",
        "amount": 1
      },
      {
        "material": "low-density-structure",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "energy-shield-mk2-equipment",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "battery-equipment-recycling",
    "name": "Personal battery recycling",
    "outputs": [
      {
        "material": "battery",
        "amount": 1
      },
      {
        "material": "steel-plate",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "battery-equipment",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "battery-mk2-equipment-recycling",
    "name": "Personal battery MK2 recycling",
    "outputs": [
      {
        "material": "battery-equipment",
        "amount": 2
      },
      {
        "material": "processing-unit",
        "amount": 3
      },
      {
        "material": "low-density-structure",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "battery-mk2-equipment",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "solar-panel-equipment-recycling",
    "name": "Portable solar panel recycling",
    "outputs": [
      {
        "material": "solar-panel",
        "amount": 0
      },
      {
        "material": "advanced-circuit",
        "amount": 0
      },
      {
        "material": "steel-plate",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "solar-panel-equipment",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "fission-reactor-equipment-recycling",
    "name": "Portable fission reactor recycling",
    "outputs": [
      {
        "material": "processing-unit",
        "amount": 50
      },
      {
        "material": "low-density-structure",
        "amount": 12
      },
      {
        "material": "uranium-fuel-cell",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "fission-reactor-equipment",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "personal-laser-defense-equipment-recycling",
    "name": "Personal laser defense recycling",
    "outputs": [
      {
        "material": "processing-unit",
        "amount": 5
      },
      {
        "material": "low-density-structure",
        "amount": 1
      },
      {
        "material": "laser-turret",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "personal-laser-defense-equipment",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "discharge-defense-equipment-recycling",
    "name": "Discharge defense recycling",
    "outputs": [
      {
        "material": "processing-unit",
        "amount": 1
      },
      {
        "material": "steel-plate",
        "amount": 5
      },
      {
        "material": "laser-turret",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "discharge-defense-equipment",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "exoskeleton-equipment-recycling",
    "name": "Exoskeleton recycling",
    "outputs": [
      {
        "material": "processing-unit",
        "amount": 2
      },
      {
        "material": "electric-engine-unit",
        "amount": 7
      },
      {
        "material": "steel-plate",
        "amount": 5
      }
    ],
    "inputs": [
      {
        "material": "exoskeleton-equipment",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "personal-roboport-equipment-recycling",
    "name": "Personal roboport recycling",
    "outputs": [
      {
        "material": "advanced-circuit",
        "amount": 2
      },
      {
        "material": "iron-gear-wheel",
        "amount": 10
      },
      {
        "material": "steel-plate",
        "amount": 5
      },
      {
        "material": "battery",
        "amount": 11
      }
    ],
    "inputs": [
      {
        "material": "personal-roboport-equipment",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "personal-roboport-mk2-equipment-recycling",
    "name": "Personal roboport MK2 recycling",
    "outputs": [
      {
        "material": "personal-roboport-equipment",
        "amount": 1
      },
      {
        "material": "processing-unit",
        "amount": 12
      },
      {
        "material": "superconductor",
        "amount": 12
      }
    ],
    "inputs": [
      {
        "material": "personal-roboport-mk2-equipment",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "laser-turret-recycling",
    "name": "Laser turret recycling",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 5
      },
      {
        "material": "electronic-circuit",
        "amount": 5
      },
      {
        "material": "battery",
        "amount": 3
      }
    ],
    "inputs": [
      {
        "material": "laser-turret",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "flamethrower-turret-recycling",
    "name": "Flamethrower turret recycling",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 7
      },
      {
        "material": "iron-gear-wheel",
        "amount": 3
      },
      {
        "material": "pipe",
        "amount": 2
      },
      {
        "material": "engine-unit",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "flamethrower-turret",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "artillery-turret-recycling",
    "name": "Artillery turret recycling",
    "outputs": [
      {
        "material": "tungsten-plate",
        "amount": 15
      },
      {
        "material": "refined-concrete",
        "amount": 15
      },
      {
        "material": "iron-gear-wheel",
        "amount": 10
      },
      {
        "material": "processing-unit",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "artillery-turret",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "gun-turret-recycling",
    "name": "Gun turret recycling",
    "outputs": [
      {
        "material": "iron-gear-wheel",
        "amount": 2
      },
      {
        "material": "copper-plate",
        "amount": 2
      },
      {
        "material": "iron-plate",
        "amount": 5
      }
    ],
    "inputs": [
      {
        "material": "gun-turret",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "wooden-chest-recycling",
    "name": "Wooden chest recycling",
    "outputs": [
      {
        "material": "wood",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "wooden-chest",
        "amount": 1
      }
    ]
  },
  {
    "id": "display-panel-recycling",
    "name": "Display panel recycling",
    "outputs": [
      {
        "material": "iron-plate",
        "amount": 0
      },
      {
        "material": "electronic-circuit",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "display-panel",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "iron-stick-recycling",
    "name": "Iron stick recycling",
    "outputs": [
      {
        "material": "iron-plate",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "iron-stick",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "stone-furnace-recycling",
    "name": "Stone furnace recycling",
    "outputs": [
      {
        "material": "stone",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "stone-furnace",
        "amount": 1
      }
    ]
  },
  {
    "id": "boiler-recycling",
    "name": "Boiler recycling",
    "outputs": [
      {
        "material": "stone-furnace",
        "amount": 0
      },
      {
        "material": "pipe",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "boiler",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "steam-engine-recycling",
    "name": "Steam engine recycling",
    "outputs": [
      {
        "material": "iron-gear-wheel",
        "amount": 2
      },
      {
        "material": "pipe",
        "amount": 1
      },
      {
        "material": "iron-plate",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "steam-engine",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "iron-gear-wheel-recycling",
    "name": "Iron gear wheel recycling",
    "outputs": [
      {
        "material": "iron-plate",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "iron-gear-wheel",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "electronic-circuit-recycling",
    "name": "Electronic circuit recycling",
    "outputs": [
      {
        "material": "iron-plate",
        "amount": 0
      },
      {
        "material": "copper-cable",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "electronic-circuit",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "transport-belt-recycling",
    "name": "Transport belt recycling",
    "outputs": [
      {
        "material": "iron-plate",
        "amount": 0
      },
      {
        "material": "iron-gear-wheel",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "transport-belt",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "electric-mining-drill-recycling",
    "name": "Electric mining drill recycling",
    "outputs": [
      {
        "material": "electronic-circuit",
        "amount": 0
      },
      {
        "material": "iron-gear-wheel",
        "amount": 1
      },
      {
        "material": "iron-plate",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "electric-mining-drill",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "burner-mining-drill-recycling",
    "name": "Burner mining drill recycling",
    "outputs": [
      {
        "material": "iron-gear-wheel",
        "amount": 0
      },
      {
        "material": "stone-furnace",
        "amount": 0
      },
      {
        "material": "iron-plate",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "burner-mining-drill",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "inserter-recycling",
    "name": "Inserter recycling",
    "outputs": [
      {
        "material": "electronic-circuit",
        "amount": 0
      },
      {
        "material": "iron-gear-wheel",
        "amount": 0
      },
      {
        "material": "iron-plate",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "inserter",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "fast-inserter-recycling",
    "name": "Fast inserter recycling",
    "outputs": [
      {
        "material": "electronic-circuit",
        "amount": 0
      },
      {
        "material": "iron-plate",
        "amount": 0
      },
      {
        "material": "inserter",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "fast-inserter",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "long-handed-inserter-recycling",
    "name": "Long-handed inserter recycling",
    "outputs": [
      {
        "material": "iron-gear-wheel",
        "amount": 0
      },
      {
        "material": "iron-plate",
        "amount": 0
      },
      {
        "material": "inserter",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "long-handed-inserter",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "burner-inserter-recycling",
    "name": "Burner inserter recycling",
    "outputs": [
      {
        "material": "iron-plate",
        "amount": 0
      },
      {
        "material": "iron-gear-wheel",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "burner-inserter",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "pipe-recycling",
    "name": "Pipe recycling",
    "outputs": [
      {
        "material": "iron-plate",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "pipe",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "offshore-pump-recycling",
    "name": "Offshore pump recycling",
    "outputs": [
      {
        "material": "pipe",
        "amount": 0
      },
      {
        "material": "iron-gear-wheel",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "offshore-pump",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "copper-cable-recycling",
    "name": "Copper cable recycling",
    "outputs": [
      {
        "material": "copper-plate",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "copper-cable",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "small-electric-pole-recycling",
    "name": "Small electric pole recycling",
    "outputs": [
      {
        "material": "wood",
        "amount": 0
      },
      {
        "material": "copper-cable",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "small-electric-pole",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "radar-recycling",
    "name": "Radar recycling",
    "outputs": [
      {
        "material": "electronic-circuit",
        "amount": 1
      },
      {
        "material": "iron-gear-wheel",
        "amount": 1
      },
      {
        "material": "iron-plate",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "radar",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "small-lamp-recycling",
    "name": "Lamp recycling",
    "outputs": [
      {
        "material": "electronic-circuit",
        "amount": 0
      },
      {
        "material": "copper-cable",
        "amount": 0
      },
      {
        "material": "iron-plate",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "small-lamp",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "pipe-to-ground-recycling",
    "name": "Pipe to ground recycling",
    "outputs": [
      {
        "material": "pipe",
        "amount": 1
      },
      {
        "material": "iron-plate",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "pipe-to-ground",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "assembling-machine-1-recycling",
    "name": "Assembling machine 1 recycling",
    "outputs": [
      {
        "material": "electronic-circuit",
        "amount": 0
      },
      {
        "material": "iron-gear-wheel",
        "amount": 1
      },
      {
        "material": "iron-plate",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "assembling-machine-1",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "lab-recycling",
    "name": "Lab recycling",
    "outputs": [
      {
        "material": "electronic-circuit",
        "amount": 2
      },
      {
        "material": "iron-gear-wheel",
        "amount": 2
      },
      {
        "material": "transport-belt",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "lab",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "stone-wall-recycling",
    "name": "Wall recycling",
    "outputs": [
      {
        "material": "stone-brick",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "stone-wall",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "assembling-machine-2-recycling",
    "name": "Assembling machine 2 recycling",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 0
      },
      {
        "material": "electronic-circuit",
        "amount": 0
      },
      {
        "material": "iron-gear-wheel",
        "amount": 1
      },
      {
        "material": "assembling-machine-1",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "assembling-machine-2",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "splitter-recycling",
    "name": "Splitter recycling",
    "outputs": [
      {
        "material": "electronic-circuit",
        "amount": 1
      },
      {
        "material": "iron-plate",
        "amount": 1
      },
      {
        "material": "transport-belt",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "splitter",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "underground-belt-recycling",
    "name": "Underground belt recycling",
    "outputs": [
      {
        "material": "iron-plate",
        "amount": 1
      },
      {
        "material": "transport-belt",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "underground-belt",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "loader-recycling",
    "name": "Loader recycling",
    "outputs": [
      {
        "material": "inserter",
        "amount": 1
      },
      {
        "material": "electronic-circuit",
        "amount": 1
      },
      {
        "material": "iron-gear-wheel",
        "amount": 1
      },
      {
        "material": "iron-plate",
        "amount": 1
      },
      {
        "material": "transport-belt",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "loader",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "engine-unit-recycling",
    "name": "Engine unit recycling",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 0
      },
      {
        "material": "iron-gear-wheel",
        "amount": 0
      },
      {
        "material": "pipe",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "engine-unit",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "iron-chest-recycling",
    "name": "Iron chest recycling",
    "outputs": [
      {
        "material": "iron-plate",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "iron-chest",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "big-electric-pole-recycling",
    "name": "Big electric pole recycling",
    "outputs": [
      {
        "material": "iron-stick",
        "amount": 2
      },
      {
        "material": "steel-plate",
        "amount": 1
      },
      {
        "material": "copper-cable",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "big-electric-pole",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "medium-electric-pole-recycling",
    "name": "Medium electric pole recycling",
    "outputs": [
      {
        "material": "iron-stick",
        "amount": 1
      },
      {
        "material": "steel-plate",
        "amount": 0
      },
      {
        "material": "copper-cable",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "medium-electric-pole",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "steel-furnace-recycling",
    "name": "Steel furnace recycling",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 1
      },
      {
        "material": "stone-brick",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "steel-furnace",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "gate-recycling",
    "name": "Gate recycling",
    "outputs": [
      {
        "material": "stone-wall",
        "amount": 0
      },
      {
        "material": "steel-plate",
        "amount": 0
      },
      {
        "material": "electronic-circuit",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "gate",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "steel-chest-recycling",
    "name": "Steel chest recycling",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "steel-chest",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "fast-underground-belt-recycling",
    "name": "Fast underground belt recycling",
    "outputs": [
      {
        "material": "iron-gear-wheel",
        "amount": 5
      },
      {
        "material": "underground-belt",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "fast-underground-belt",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "fast-splitter-recycling",
    "name": "Fast splitter recycling",
    "outputs": [
      {
        "material": "splitter",
        "amount": 0
      },
      {
        "material": "iron-gear-wheel",
        "amount": 2
      },
      {
        "material": "electronic-circuit",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "fast-splitter",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "concrete-recycling",
    "name": "Concrete recycling",
    "outputs": [
      {
        "material": "stone-brick",
        "amount": 0
      },
      {
        "material": "iron-ore",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "concrete",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "hazard-concrete-recycling",
    "name": "Hazard concrete recycling",
    "outputs": [
      {
        "material": "stone-brick",
        "amount": 0
      },
      {
        "material": "iron-ore",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "hazard-concrete",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "refined-concrete-recycling",
    "name": "Refined concrete recycling",
    "outputs": [
      {
        "material": "concrete",
        "amount": 0
      },
      {
        "material": "iron-stick",
        "amount": 0
      },
      {
        "material": "steel-plate",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "refined-concrete",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "refined-hazard-concrete-recycling",
    "name": "Refined hazard concrete recycling",
    "outputs": [
      {
        "material": "concrete",
        "amount": 0
      },
      {
        "material": "iron-stick",
        "amount": 0
      },
      {
        "material": "steel-plate",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "refined-hazard-concrete",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "fast-transport-belt-recycling",
    "name": "Fast transport belt recycling",
    "outputs": [
      {
        "material": "iron-gear-wheel",
        "amount": 1
      },
      {
        "material": "transport-belt",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "fast-transport-belt",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "solar-panel-recycling",
    "name": "Solar panel recycling",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 1
      },
      {
        "material": "electronic-circuit",
        "amount": 3
      },
      {
        "material": "copper-plate",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "solar-panel",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "rail-signal-recycling",
    "name": "Rail signal recycling",
    "outputs": [
      {
        "material": "electronic-circuit",
        "amount": 0
      },
      {
        "material": "iron-plate",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "rail-signal",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "rail-chain-signal-recycling",
    "name": "Rail chain signal recycling",
    "outputs": [
      {
        "material": "electronic-circuit",
        "amount": 0
      },
      {
        "material": "iron-plate",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "rail-chain-signal",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "train-stop-recycling",
    "name": "Train stop recycling",
    "outputs": [
      {
        "material": "electronic-circuit",
        "amount": 1
      },
      {
        "material": "iron-plate",
        "amount": 1
      },
      {
        "material": "iron-stick",
        "amount": 1
      },
      {
        "material": "steel-plate",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "train-stop",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "arithmetic-combinator-recycling",
    "name": "Arithmetic combinator recycling",
    "outputs": [
      {
        "material": "copper-cable",
        "amount": 1
      },
      {
        "material": "electronic-circuit",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "arithmetic-combinator",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "decider-combinator-recycling",
    "name": "Decider combinator recycling",
    "outputs": [
      {
        "material": "copper-cable",
        "amount": 1
      },
      {
        "material": "electronic-circuit",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "decider-combinator",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "constant-combinator-recycling",
    "name": "Constant combinator recycling",
    "outputs": [
      {
        "material": "copper-cable",
        "amount": 1
      },
      {
        "material": "electronic-circuit",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "constant-combinator",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "selector-combinator-recycling",
    "name": "Selector combinator recycling",
    "outputs": [
      {
        "material": "advanced-circuit",
        "amount": 0
      },
      {
        "material": "decider-combinator",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "selector-combinator",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "power-switch-recycling",
    "name": "Power switch recycling",
    "outputs": [
      {
        "material": "iron-plate",
        "amount": 1
      },
      {
        "material": "copper-cable",
        "amount": 1
      },
      {
        "material": "electronic-circuit",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "power-switch",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "programmable-speaker-recycling",
    "name": "Programmable speaker recycling",
    "outputs": [
      {
        "material": "iron-plate",
        "amount": 0
      },
      {
        "material": "iron-stick",
        "amount": 1
      },
      {
        "material": "copper-cable",
        "amount": 1
      },
      {
        "material": "electronic-circuit",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "programmable-speaker",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "express-transport-belt-recycling",
    "name": "Express transport belt recycling",
    "outputs": [
      {
        "material": "iron-gear-wheel",
        "amount": 2
      },
      {
        "material": "fast-transport-belt",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "express-transport-belt",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "assembling-machine-3-recycling",
    "name": "Assembling machine 3 recycling",
    "outputs": [
      {
        "material": "assembling-machine-2",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "assembling-machine-3",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "land-mine-recycling",
    "name": "Land mine recycling",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 0
      },
      {
        "material": "explosives",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "land-mine",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "express-underground-belt-recycling",
    "name": "Express underground belt recycling",
    "outputs": [
      {
        "material": "iron-gear-wheel",
        "amount": 10
      },
      {
        "material": "fast-underground-belt",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "express-underground-belt",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "fast-loader-recycling",
    "name": "Fast loader recycling",
    "outputs": [
      {
        "material": "fast-transport-belt",
        "amount": 1
      },
      {
        "material": "loader",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "fast-loader",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "express-loader-recycling",
    "name": "Express loader recycling",
    "outputs": [
      {
        "material": "express-transport-belt",
        "amount": 1
      },
      {
        "material": "fast-loader",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "express-loader",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "express-splitter-recycling",
    "name": "Express splitter recycling",
    "outputs": [
      {
        "material": "fast-splitter",
        "amount": 0
      },
      {
        "material": "iron-gear-wheel",
        "amount": 2
      },
      {
        "material": "advanced-circuit",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "express-splitter",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "advanced-circuit-recycling",
    "name": "Advanced circuit recycling",
    "outputs": [
      {
        "material": "electronic-circuit",
        "amount": 0
      },
      {
        "material": "plastic-bar",
        "amount": 0
      },
      {
        "material": "copper-cable",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "advanced-circuit",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "processing-unit-recycling",
    "name": "Processing unit recycling",
    "outputs": [
      {
        "material": "electronic-circuit",
        "amount": 5
      },
      {
        "material": "advanced-circuit",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "processing-unit",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "logistic-robot-recycling",
    "name": "Logistic robot recycling",
    "outputs": [
      {
        "material": "flying-robot-frame",
        "amount": 0
      },
      {
        "material": "advanced-circuit",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "logistic-robot",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "construction-robot-recycling",
    "name": "Construction robot recycling",
    "outputs": [
      {
        "material": "flying-robot-frame",
        "amount": 0
      },
      {
        "material": "electronic-circuit",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "construction-robot",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "passive-provider-chest-recycling",
    "name": "Passive provider chest recycling",
    "outputs": [
      {
        "material": "steel-chest",
        "amount": 0
      },
      {
        "material": "electronic-circuit",
        "amount": 0
      },
      {
        "material": "advanced-circuit",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "passive-provider-chest",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "active-provider-chest-recycling",
    "name": "Active provider chest recycling",
    "outputs": [
      {
        "material": "steel-chest",
        "amount": 0
      },
      {
        "material": "electronic-circuit",
        "amount": 0
      },
      {
        "material": "advanced-circuit",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "active-provider-chest",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "storage-chest-recycling",
    "name": "Storage chest recycling",
    "outputs": [
      {
        "material": "steel-chest",
        "amount": 0
      },
      {
        "material": "electronic-circuit",
        "amount": 0
      },
      {
        "material": "advanced-circuit",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "storage-chest",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "buffer-chest-recycling",
    "name": "Buffer chest recycling",
    "outputs": [
      {
        "material": "steel-chest",
        "amount": 0
      },
      {
        "material": "electronic-circuit",
        "amount": 0
      },
      {
        "material": "advanced-circuit",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "buffer-chest",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "requester-chest-recycling",
    "name": "Requester chest recycling",
    "outputs": [
      {
        "material": "steel-chest",
        "amount": 0
      },
      {
        "material": "electronic-circuit",
        "amount": 0
      },
      {
        "material": "advanced-circuit",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "requester-chest",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "rocket-silo-recycling",
    "name": "Rocket silo recycling",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 250
      },
      {
        "material": "concrete",
        "amount": 250
      },
      {
        "material": "pipe",
        "amount": 25
      },
      {
        "material": "processing-unit",
        "amount": 50
      },
      {
        "material": "electric-engine-unit",
        "amount": 50
      }
    ],
    "inputs": [
      {
        "material": "rocket-silo",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "cargo-landing-pad-recycling",
    "name": "Cargo landing pad recycling",
    "outputs": [
      {
        "material": "concrete",
        "amount": 50
      },
      {
        "material": "steel-plate",
        "amount": 6
      },
      {
        "material": "processing-unit",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "cargo-landing-pad",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "roboport-recycling",
    "name": "Roboport recycling",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 11
      },
      {
        "material": "iron-gear-wheel",
        "amount": 11
      },
      {
        "material": "advanced-circuit",
        "amount": 11
      }
    ],
    "inputs": [
      {
        "material": "roboport",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "substation-recycling",
    "name": "Substation recycling",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 2
      },
      {
        "material": "advanced-circuit",
        "amount": 1
      },
      {
        "material": "copper-cable",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "substation",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "accumulator-recycling",
    "name": "Accumulator recycling",
    "outputs": [
      {
        "material": "iron-plate",
        "amount": 0
      },
      {
        "material": "battery",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "accumulator",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "electric-furnace-recycling",
    "name": "Electric furnace recycling",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 2
      },
      {
        "material": "advanced-circuit",
        "amount": 1
      },
      {
        "material": "stone-brick",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "electric-furnace",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "beacon-recycling",
    "name": "Beacon recycling",
    "outputs": [
      {
        "material": "electronic-circuit",
        "amount": 5
      },
      {
        "material": "advanced-circuit",
        "amount": 5
      },
      {
        "material": "steel-plate",
        "amount": 2
      },
      {
        "material": "copper-cable",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "beacon",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "pumpjack-recycling",
    "name": "Pumpjack recycling",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 1
      },
      {
        "material": "iron-gear-wheel",
        "amount": 2
      },
      {
        "material": "electronic-circuit",
        "amount": 1
      },
      {
        "material": "pipe",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "pumpjack",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "oil-refinery-recycling",
    "name": "Oil refinery recycling",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 3
      },
      {
        "material": "iron-gear-wheel",
        "amount": 2
      },
      {
        "material": "stone-brick",
        "amount": 2
      },
      {
        "material": "electronic-circuit",
        "amount": 2
      },
      {
        "material": "pipe",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "oil-refinery",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "electric-engine-unit-recycling",
    "name": "Electric engine unit recycling",
    "outputs": [
      {
        "material": "engine-unit",
        "amount": 0
      },
      {
        "material": "electronic-circuit",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "electric-engine-unit",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "flying-robot-frame-recycling",
    "name": "Flying robot frame recycling",
    "outputs": [
      {
        "material": "electric-engine-unit",
        "amount": 0
      },
      {
        "material": "battery",
        "amount": 0
      },
      {
        "material": "steel-plate",
        "amount": 0
      },
      {
        "material": "electronic-circuit",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "flying-robot-frame",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "battery-recycling",
    "name": "Battery recycling",
    "outputs": [
      {
        "material": "iron-plate",
        "amount": 0
      },
      {
        "material": "copper-plate",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "battery",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "storage-tank-recycling",
    "name": "Storage tank recycling",
    "outputs": [
      {
        "material": "iron-plate",
        "amount": 5
      },
      {
        "material": "steel-plate",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "storage-tank",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "pump-recycling",
    "name": "Pump recycling",
    "outputs": [
      {
        "material": "engine-unit",
        "amount": 0
      },
      {
        "material": "steel-plate",
        "amount": 0
      },
      {
        "material": "pipe",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "pump",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "chemical-plant-recycling",
    "name": "Chemical plant recycling",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 1
      },
      {
        "material": "iron-gear-wheel",
        "amount": 1
      },
      {
        "material": "electronic-circuit",
        "amount": 1
      },
      {
        "material": "pipe",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "chemical-plant",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "low-density-structure-recycling",
    "name": "Low density structure recycling",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 0
      },
      {
        "material": "copper-plate",
        "amount": 5
      },
      {
        "material": "plastic-bar",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "low-density-structure",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "rocket-fuel-recycling",
    "name": "Rocket fuel recycling",
    "outputs": [
      {
        "material": "solid-fuel",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "rocket-fuel",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "nuclear-reactor-recycling",
    "name": "Nuclear reactor recycling",
    "outputs": [
      {
        "material": "concrete",
        "amount": 125
      },
      {
        "material": "steel-plate",
        "amount": 125
      },
      {
        "material": "advanced-circuit",
        "amount": 125
      },
      {
        "material": "copper-plate",
        "amount": 125
      }
    ],
    "inputs": [
      {
        "material": "nuclear-reactor",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "centrifuge-recycling",
    "name": "Centrifuge recycling",
    "outputs": [
      {
        "material": "concrete",
        "amount": 25
      },
      {
        "material": "steel-plate",
        "amount": 12
      },
      {
        "material": "advanced-circuit",
        "amount": 25
      },
      {
        "material": "iron-gear-wheel",
        "amount": 25
      }
    ],
    "inputs": [
      {
        "material": "centrifuge",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "nuclear-fuel-recycling",
    "name": "Nuclear fuel recycling",
    "outputs": [
      {
        "material": "uranium-235",
        "amount": 0
      },
      {
        "material": "rocket-fuel",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "nuclear-fuel",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "heat-exchanger-recycling",
    "name": "Heat exchanger recycling",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 2
      },
      {
        "material": "copper-plate",
        "amount": 25
      },
      {
        "material": "pipe",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "heat-exchanger",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "heat-pipe-recycling",
    "name": "Heat pipe recycling",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 2
      },
      {
        "material": "copper-plate",
        "amount": 5
      }
    ],
    "inputs": [
      {
        "material": "heat-pipe",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "steam-turbine-recycling",
    "name": "Steam turbine recycling",
    "outputs": [
      {
        "material": "iron-gear-wheel",
        "amount": 12
      },
      {
        "material": "copper-plate",
        "amount": 12
      },
      {
        "material": "pipe",
        "amount": 5
      }
    ],
    "inputs": [
      {
        "material": "steam-turbine",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "rail-support-recycling",
    "name": "Rail support recycling",
    "outputs": [
      {
        "material": "refined-concrete",
        "amount": 5
      },
      {
        "material": "steel-plate",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "rail-support",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "recycler-recycling",
    "name": "Recycler recycling",
    "outputs": [
      {
        "material": "processing-unit",
        "amount": 1
      },
      {
        "material": "steel-plate",
        "amount": 5
      },
      {
        "material": "iron-gear-wheel",
        "amount": 10
      },
      {
        "material": "concrete",
        "amount": 5
      }
    ],
    "inputs": [
      {
        "material": "recycler",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "artificial-yumako-soil-recycling",
    "name": "Artificial yumako soil recycling",
    "outputs": [
      {
        "material": "yumako-seed",
        "amount": 0
      },
      {
        "material": "nutrients",
        "amount": 1
      },
      {
        "material": "landfill",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "artificial-yumako-soil",
        "amount": 1
      }
    ],
    "spaceAge": true
  },
  {
    "id": "overgrowth-yumako-soil-recycling",
    "name": "Overgrowth yumako soil recycling",
    "outputs": [
      {
        "material": "artificial-yumako-soil",
        "amount": 0
      },
      {
        "material": "yumako-seed",
        "amount": 1
      },
      {
        "material": "biter-egg",
        "amount": 2
      },
      {
        "material": "spoilage",
        "amount": 12
      }
    ],
    "inputs": [
      {
        "material": "overgrowth-yumako-soil",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "artificial-jellynut-soil-recycling",
    "name": "Artificial jellynut soil recycling",
    "outputs": [
      {
        "material": "jellynut-seed",
        "amount": 0
      },
      {
        "material": "nutrients",
        "amount": 1
      },
      {
        "material": "landfill",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "artificial-jellynut-soil",
        "amount": 1
      }
    ],
    "spaceAge": true
  },
  {
    "id": "overgrowth-jellynut-soil-recycling",
    "name": "Overgrowth jellynut soil recycling",
    "outputs": [
      {
        "material": "artificial-jellynut-soil",
        "amount": 0
      },
      {
        "material": "jellynut-seed",
        "amount": 1
      },
      {
        "material": "biter-egg",
        "amount": 2
      },
      {
        "material": "spoilage",
        "amount": 12
      }
    ],
    "inputs": [
      {
        "material": "overgrowth-jellynut-soil",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "nutrients-recycling",
    "name": "Nutrients recycling",
    "outputs": [
      {
        "material": "spoilage",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "nutrients",
        "amount": 1
      }
    ],
    "spaceAge": true
  },
  {
    "id": "toolbelt-equipment-recycling",
    "name": "Toolbelt equipment recycling",
    "outputs": [
      {
        "material": "advanced-circuit",
        "amount": 0
      },
      {
        "material": "carbon-fiber",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "toolbelt-equipment",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "battery-mk3-equipment-recycling",
    "name": "Personal battery MK3 recycling",
    "outputs": [
      {
        "material": "battery-mk2-equipment",
        "amount": 1
      },
      {
        "material": "supercapacitor",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "battery-mk3-equipment",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "space-platform-foundation-recycling",
    "name": "Space platform foundation recycling",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 5
      },
      {
        "material": "copper-cable",
        "amount": 5
      }
    ],
    "inputs": [
      {
        "material": "space-platform-foundation",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "stack-inserter-recycling",
    "name": "Stack inserter recycling",
    "outputs": [
      {
        "material": "bulk-inserter",
        "amount": 0
      },
      {
        "material": "processing-unit",
        "amount": 0
      },
      {
        "material": "carbon-fiber",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "stack-inserter",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "rocket-turret-recycling",
    "name": "Rocket turret recycling",
    "outputs": [
      {
        "material": "processing-unit",
        "amount": 1
      },
      {
        "material": "carbon-fiber",
        "amount": 5
      },
      {
        "material": "steel-plate",
        "amount": 5
      },
      {
        "material": "iron-gear-wheel",
        "amount": 5
      }
    ],
    "inputs": [
      {
        "material": "rocket-turret",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "infinity-chest-recycling",
    "name": "Infinity chest recycling",
    "outputs": [
      {
        "material": "steel-chest",
        "amount": 0
      },
      {
        "material": "electronic-circuit",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "infinity-chest",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "infinity-pipe-recycling",
    "name": "Infinity pipe recycling",
    "outputs": [
      {
        "material": "pipe",
        "amount": 0
      },
      {
        "material": "electronic-circuit",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "infinity-pipe",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "heat-interface-recycling",
    "name": "Heat interface recycling",
    "outputs": [
      {
        "material": "heat-pipe",
        "amount": 0
      },
      {
        "material": "electronic-circuit",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "heat-interface",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "cargo-bay-recycling",
    "name": "Cargo bay recycling",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 5
      },
      {
        "material": "low-density-structure",
        "amount": 5
      },
      {
        "material": "processing-unit",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "cargo-bay",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "landing-pad-unloading-bay-recycling",
    "name": "Landing pad unloading bay recycling",
    "outputs": [
      {
        "material": "cargo-bay",
        "amount": 0
      },
      {
        "material": "steel-chest",
        "amount": 1
      },
      {
        "material": "electric-engine-unit",
        "amount": 3
      },
      {
        "material": "processing-unit",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "landing-pad-unloading-bay",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "asteroid-collector-recycling",
    "name": "Asteroid collector recycling",
    "outputs": [
      {
        "material": "low-density-structure",
        "amount": 5
      },
      {
        "material": "electric-engine-unit",
        "amount": 2
      },
      {
        "material": "processing-unit",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "asteroid-collector",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "crusher-recycling",
    "name": "Crusher recycling",
    "outputs": [
      {
        "material": "low-density-structure",
        "amount": 5
      },
      {
        "material": "steel-plate",
        "amount": 2
      },
      {
        "material": "electric-engine-unit",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "crusher",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "thruster-recycling",
    "name": "Thruster recycling",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 2
      },
      {
        "material": "processing-unit",
        "amount": 2
      },
      {
        "material": "electric-engine-unit",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "thruster",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "foundry-recycling",
    "name": "Foundry recycling",
    "outputs": [
      {
        "material": "tungsten-carbide",
        "amount": 12
      },
      {
        "material": "steel-plate",
        "amount": 12
      },
      {
        "material": "electronic-circuit",
        "amount": 7
      },
      {
        "material": "refined-concrete",
        "amount": 5
      }
    ],
    "inputs": [
      {
        "material": "foundry",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "turbo-transport-belt-recycling",
    "name": "Turbo transport belt recycling",
    "outputs": [
      {
        "material": "tungsten-plate",
        "amount": 1
      },
      {
        "material": "express-transport-belt",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "turbo-transport-belt",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "turbo-underground-belt-recycling",
    "name": "Turbo underground belt recycling",
    "outputs": [
      {
        "material": "tungsten-plate",
        "amount": 5
      },
      {
        "material": "express-underground-belt",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "turbo-underground-belt",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "turbo-splitter-recycling",
    "name": "Turbo splitter recycling",
    "outputs": [
      {
        "material": "express-splitter",
        "amount": 0
      },
      {
        "material": "tungsten-plate",
        "amount": 3
      },
      {
        "material": "processing-unit",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "turbo-splitter",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "turbo-loader-recycling",
    "name": "Turbo loader recycling",
    "outputs": [
      {
        "material": "turbo-transport-belt",
        "amount": 1
      },
      {
        "material": "express-loader",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "turbo-loader",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "big-mining-drill-recycling",
    "name": "Big mining drill recycling",
    "outputs": [
      {
        "material": "electric-mining-drill",
        "amount": 0
      },
      {
        "material": "tungsten-carbide",
        "amount": 5
      },
      {
        "material": "electric-engine-unit",
        "amount": 2
      },
      {
        "material": "advanced-circuit",
        "amount": 2
      }
    ],
    "inputs": [
      {
        "material": "big-mining-drill",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "railgun-turret-recycling",
    "name": "Railgun turret recycling",
    "outputs": [
      {
        "material": "quantum-processor",
        "amount": 25
      },
      {
        "material": "tungsten-plate",
        "amount": 7
      },
      {
        "material": "superconductor",
        "amount": 12
      },
      {
        "material": "carbon-fiber",
        "amount": 5
      }
    ],
    "inputs": [
      {
        "material": "railgun-turret",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "agricultural-tower-recycling",
    "name": "Agricultural tower recycling",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 2
      },
      {
        "material": "electronic-circuit",
        "amount": 0
      },
      {
        "material": "spoilage",
        "amount": 5
      },
      {
        "material": "landfill",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "agricultural-tower",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "biochamber-recycling",
    "name": "Biochamber recycling",
    "outputs": [
      {
        "material": "nutrients",
        "amount": 1
      },
      {
        "material": "pentapod-egg",
        "amount": 0
      },
      {
        "material": "iron-plate",
        "amount": 5
      },
      {
        "material": "electronic-circuit",
        "amount": 1
      },
      {
        "material": "landfill",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "biochamber",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "lightning-rod-recycling",
    "name": "Lightning rod recycling",
    "outputs": [
      {
        "material": "copper-cable",
        "amount": 3
      },
      {
        "material": "steel-plate",
        "amount": 2
      },
      {
        "material": "stone-brick",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "lightning-rod",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "electromagnetic-plant-recycling",
    "name": "Electromagnetic plant recycling",
    "outputs": [
      {
        "material": "holmium-plate",
        "amount": 37
      },
      {
        "material": "steel-plate",
        "amount": 12
      },
      {
        "material": "processing-unit",
        "amount": 12
      },
      {
        "material": "refined-concrete",
        "amount": 12
      }
    ],
    "inputs": [
      {
        "material": "electromagnetic-plant",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "supercapacitor-recycling",
    "name": "Supercapacitor recycling",
    "outputs": [
      {
        "material": "holmium-plate",
        "amount": 0
      },
      {
        "material": "superconductor",
        "amount": 0
      },
      {
        "material": "electronic-circuit",
        "amount": 1
      },
      {
        "material": "battery",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "supercapacitor",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "lightning-collector-recycling",
    "name": "Lightning collector recycling",
    "outputs": [
      {
        "material": "lightning-rod",
        "amount": 0
      },
      {
        "material": "supercapacitor",
        "amount": 2
      },
      {
        "material": "accumulator",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "lightning-collector",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "tesla-turret-recycling",
    "name": "Tesla turret recycling",
    "outputs": [
      {
        "material": "supercapacitor",
        "amount": 2
      },
      {
        "material": "processing-unit",
        "amount": 2
      },
      {
        "material": "superconductor",
        "amount": 12
      }
    ],
    "inputs": [
      {
        "material": "tesla-turret",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "heating-tower-recycling",
    "name": "Heating tower recycling",
    "outputs": [
      {
        "material": "boiler",
        "amount": 0
      },
      {
        "material": "heat-pipe",
        "amount": 1
      },
      {
        "material": "concrete",
        "amount": 5
      }
    ],
    "inputs": [
      {
        "material": "heating-tower",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "cryogenic-plant-recycling",
    "name": "Cryogenic plant recycling",
    "outputs": [
      {
        "material": "refined-concrete",
        "amount": 10
      },
      {
        "material": "superconductor",
        "amount": 5
      },
      {
        "material": "processing-unit",
        "amount": 5
      },
      {
        "material": "lithium-plate",
        "amount": 5
      }
    ],
    "inputs": [
      {
        "material": "cryogenic-plant",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "quantum-processor-recycling",
    "name": "Quantum processor recycling",
    "outputs": [
      {
        "material": "tungsten-carbide",
        "amount": 0
      },
      {
        "material": "processing-unit",
        "amount": 0
      },
      {
        "material": "superconductor",
        "amount": 0
      },
      {
        "material": "carbon-fiber",
        "amount": 0
      },
      {
        "material": "lithium-plate",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "quantum-processor",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "fusion-reactor-equipment-recycling",
    "name": "Portable fusion reactor recycling",
    "outputs": [
      {
        "material": "fission-reactor-equipment",
        "amount": 0
      },
      {
        "material": "fusion-power-cell",
        "amount": 2
      },
      {
        "material": "tungsten-plate",
        "amount": 62
      },
      {
        "material": "carbon-fiber",
        "amount": 25
      },
      {
        "material": "supercapacitor",
        "amount": 6
      },
      {
        "material": "quantum-processor",
        "amount": 62
      }
    ],
    "inputs": [
      {
        "material": "fusion-reactor-equipment",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "fusion-reactor-recycling",
    "name": "Fusion reactor recycling",
    "outputs": [
      {
        "material": "tungsten-plate",
        "amount": 50
      },
      {
        "material": "superconductor",
        "amount": 50
      },
      {
        "material": "quantum-processor",
        "amount": 62
      }
    ],
    "inputs": [
      {
        "material": "fusion-reactor",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "fusion-generator-recycling",
    "name": "Fusion generator recycling",
    "outputs": [
      {
        "material": "tungsten-plate",
        "amount": 25
      },
      {
        "material": "superconductor",
        "amount": 25
      },
      {
        "material": "quantum-processor",
        "amount": 12
      }
    ],
    "inputs": [
      {
        "material": "fusion-generator",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "ice-platform-recycling",
    "name": "Ice platform recycling",
    "outputs": [
      {
        "material": "ice",
        "amount": 12
      }
    ],
    "inputs": [
      {
        "material": "ice-platform",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "foundation-recycling",
    "name": "Foundation recycling",
    "outputs": [
      {
        "material": "tungsten-plate",
        "amount": 1
      },
      {
        "material": "lithium-plate",
        "amount": 1
      },
      {
        "material": "carbon-fiber",
        "amount": 1
      },
      {
        "material": "stone",
        "amount": 5
      }
    ],
    "inputs": [
      {
        "material": "foundation",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "water-barrel-recycling",
    "name": "Water barrel recycling",
    "outputs": [
      {
        "material": "barrel",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "water-barrel",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "sulfuric-acid-barrel-recycling",
    "name": "Sulfuric acid barrel recycling",
    "outputs": [
      {
        "material": "barrel",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "sulfuric-acid-barrel",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "crude-oil-barrel-recycling",
    "name": "Crude oil barrel recycling",
    "outputs": [
      {
        "material": "barrel",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "crude-oil-barrel",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "heavy-oil-barrel-recycling",
    "name": "Heavy oil barrel recycling",
    "outputs": [
      {
        "material": "barrel",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "heavy-oil-barrel",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "light-oil-barrel-recycling",
    "name": "Light oil barrel recycling",
    "outputs": [
      {
        "material": "barrel",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "light-oil-barrel",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "petroleum-gas-barrel-recycling",
    "name": "Petroleum gas barrel recycling",
    "outputs": [
      {
        "material": "barrel",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "petroleum-gas-barrel",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "lubricant-barrel-recycling",
    "name": "Lubricant barrel recycling",
    "outputs": [
      {
        "material": "barrel",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "lubricant-barrel",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "fluoroketone-cold-barrel-recycling",
    "name": "Fluoroketone (Cold) barrel recycling",
    "outputs": [
      {
        "material": "barrel",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "fluoroketone-cold-barrel",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "fluoroketone-hot-barrel-recycling",
    "name": "Fluoroketone (Hot) barrel recycling",
    "outputs": [
      {
        "material": "barrel",
        "amount": 0
      }
    ],
    "inputs": [
      {
        "material": "fluoroketone-hot-barrel",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "stone-brick-recycling",
    "name": "Stone brick recycling",
    "outputs": [
      {
        "material": "stone-brick",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "stone-brick",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "wood-recycling",
    "name": "Wood recycling",
    "outputs": [
      {
        "material": "wood",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "wood",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "coal-recycling",
    "name": "Coal recycling",
    "outputs": [
      {
        "material": "coal",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "coal",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "stone-recycling",
    "name": "Stone recycling",
    "outputs": [
      {
        "material": "stone",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "stone",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "iron-ore-recycling",
    "name": "Iron ore recycling",
    "outputs": [
      {
        "material": "iron-ore",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "iron-ore",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "copper-ore-recycling",
    "name": "Copper ore recycling",
    "outputs": [
      {
        "material": "copper-ore",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "copper-ore",
        "amount": 1
      }
    ]
  },
  {
    "id": "iron-plate-recycling",
    "name": "Iron plate recycling",
    "outputs": [
      {
        "material": "iron-plate",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "iron-plate",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "copper-plate-recycling",
    "name": "Copper plate recycling",
    "outputs": [
      {
        "material": "copper-plate",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "copper-plate",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "automation-science-pack-recycling",
    "name": "Automation science pack recycling",
    "outputs": [
      {
        "material": "automation-science-pack",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "automation-science-pack",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "logistic-science-pack-recycling",
    "name": "Logistic science pack recycling",
    "outputs": [
      {
        "material": "logistic-science-pack",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "logistic-science-pack",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "steel-plate-recycling",
    "name": "Steel plate recycling",
    "outputs": [
      {
        "material": "steel-plate",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "steel-plate",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "solid-fuel-recycling",
    "name": "Solid fuel recycling",
    "outputs": [
      {
        "material": "solid-fuel",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "solid-fuel",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "landfill-recycling",
    "name": "Landfill recycling",
    "outputs": [
      {
        "material": "landfill",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "landfill",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "uranium-ore-recycling",
    "name": "Uranium ore recycling",
    "outputs": [
      {
        "material": "uranium-ore",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "uranium-ore",
        "amount": 1
      }
    ]
  },
  {
    "id": "chemical-science-pack-recycling",
    "name": "Chemical science pack recycling",
    "outputs": [
      {
        "material": "chemical-science-pack",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "chemical-science-pack",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "military-science-pack-recycling",
    "name": "Military science pack recycling",
    "outputs": [
      {
        "material": "military-science-pack",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "military-science-pack",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "production-science-pack-recycling",
    "name": "Production science pack recycling",
    "outputs": [
      {
        "material": "production-science-pack",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "production-science-pack",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "utility-science-pack-recycling",
    "name": "Utility science pack recycling",
    "outputs": [
      {
        "material": "utility-science-pack",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "utility-science-pack",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "space-science-pack-recycling",
    "name": "Space science pack recycling",
    "outputs": [
      {
        "material": "space-science-pack",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "space-science-pack",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "lane-splitter-recycling",
    "name": "Lane splitter recycling",
    "outputs": [
      {
        "material": "lane-splitter",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "lane-splitter",
        "amount": 1
      }
    ]
  },
  {
    "id": "coin-recycling",
    "name": "Coin recycling",
    "outputs": [
      {
        "material": "coin",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "coin",
        "amount": 1
      }
    ]
  },
  {
    "id": "sulfur-recycling",
    "name": "Sulfur recycling",
    "outputs": [
      {
        "material": "sulfur",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "sulfur",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "plastic-bar-recycling",
    "name": "Plastic bar recycling",
    "outputs": [
      {
        "material": "plastic-bar",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "plastic-bar",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "explosives-recycling",
    "name": "Explosives recycling",
    "outputs": [
      {
        "material": "explosives",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "explosives",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "electric-energy-interface-recycling",
    "name": "Electric energy interface recycling",
    "outputs": [
      {
        "material": "electric-energy-interface",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "electric-energy-interface",
        "amount": 1
      }
    ]
  },
  {
    "id": "uranium-235-recycling",
    "name": "Uranium-235 recycling",
    "outputs": [
      {
        "material": "uranium-235",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "uranium-235",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "uranium-238-recycling",
    "name": "Uranium-238 recycling",
    "outputs": [
      {
        "material": "uranium-238",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "uranium-238",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "uranium-fuel-cell-recycling",
    "name": "Uranium fuel cell recycling",
    "outputs": [
      {
        "material": "uranium-fuel-cell",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "uranium-fuel-cell",
        "amount": 1
      }
    ],
    "alternate": true
  },
  {
    "id": "depleted-uranium-fuel-cell-recycling",
    "name": "Depleted uranium fuel cell recycling",
    "outputs": [
      {
        "material": "depleted-uranium-fuel-cell",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "depleted-uranium-fuel-cell",
        "amount": 1
      }
    ]
  },
  {
    "id": "simple-entity-with-force-recycling",
    "name": "Simple entity with force recycling",
    "outputs": [
      {
        "material": "simple-entity-with-force",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "simple-entity-with-force",
        "amount": 1
      }
    ]
  },
  {
    "id": "simple-entity-with-owner-recycling",
    "name": "Simple entity with owner recycling",
    "outputs": [
      {
        "material": "simple-entity-with-owner",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "simple-entity-with-owner",
        "amount": 1
      }
    ]
  },
  {
    "id": "infinity-cargo-wagon-recycling",
    "name": "Infinity cargo wagon recycling",
    "outputs": [
      {
        "material": "infinity-cargo-wagon",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "infinity-cargo-wagon",
        "amount": 1
      }
    ]
  },
  {
    "id": "burner-generator-recycling",
    "name": "Burner generator recycling",
    "outputs": [
      {
        "material": "burner-generator",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "burner-generator",
        "amount": 1
      }
    ]
  },
  {
    "id": "linked-chest-recycling",
    "name": "Linked chest recycling",
    "outputs": [
      {
        "material": "linked-chest",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "linked-chest",
        "amount": 1
      }
    ]
  },
  {
    "id": "proxy-container-recycling",
    "name": "Proxy container recycling",
    "outputs": [
      {
        "material": "proxy-container",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "proxy-container",
        "amount": 1
      }
    ]
  },
  {
    "id": "bottomless-chest-recycling",
    "name": "Bottomless chest recycling",
    "outputs": [
      {
        "material": "bottomless-chest",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "bottomless-chest",
        "amount": 1
      }
    ]
  },
  {
    "id": "linked-belt-recycling",
    "name": "Linked belt recycling",
    "outputs": [
      {
        "material": "linked-belt",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "linked-belt",
        "amount": 1
      }
    ]
  },
  {
    "id": "one-way-valve-recycling",
    "name": "One-way valve recycling",
    "outputs": [
      {
        "material": "one-way-valve",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "one-way-valve",
        "amount": 1
      }
    ]
  },
  {
    "id": "overflow-valve-recycling",
    "name": "Overflow valve recycling",
    "outputs": [
      {
        "material": "overflow-valve",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "overflow-valve",
        "amount": 1
      }
    ]
  },
  {
    "id": "top-up-valve-recycling",
    "name": "Top-up valve recycling",
    "outputs": [
      {
        "material": "top-up-valve",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "top-up-valve",
        "amount": 1
      }
    ]
  },
  {
    "id": "electric-energy-interface-equipment-recycling",
    "name": "Electric energy interface equipment recycling",
    "outputs": [
      {
        "material": "electric-energy-interface-equipment",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "electric-energy-interface-equipment",
        "amount": 1
      }
    ]
  },
  {
    "id": "science-recycling",
    "name": "Science recycling",
    "outputs": [
      {
        "material": "science",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "science",
        "amount": 1
      }
    ]
  },
  {
    "id": "metallurgic-science-pack-recycling",
    "name": "Metallurgic science pack recycling",
    "outputs": [
      {
        "material": "metallurgic-science-pack",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "metallurgic-science-pack",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "agricultural-science-pack-recycling",
    "name": "Agricultural science pack recycling",
    "outputs": [
      {
        "material": "agricultural-science-pack",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "agricultural-science-pack",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "electromagnetic-science-pack-recycling",
    "name": "Electromagnetic science pack recycling",
    "outputs": [
      {
        "material": "electromagnetic-science-pack",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "electromagnetic-science-pack",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "cryogenic-science-pack-recycling",
    "name": "Cryogenic science pack recycling",
    "outputs": [
      {
        "material": "cryogenic-science-pack",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "cryogenic-science-pack",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "promethium-science-pack-recycling",
    "name": "Promethium science pack recycling",
    "outputs": [
      {
        "material": "promethium-science-pack",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "promethium-science-pack",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "metallic-asteroid-chunk-recycling",
    "name": "Metallic asteroid chunk recycling",
    "outputs": [
      {
        "material": "metallic-asteroid-chunk",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "metallic-asteroid-chunk",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "carbonic-asteroid-chunk-recycling",
    "name": "Carbonic asteroid chunk recycling",
    "outputs": [
      {
        "material": "carbonic-asteroid-chunk",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "carbonic-asteroid-chunk",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "oxide-asteroid-chunk-recycling",
    "name": "Oxide asteroid chunk recycling",
    "outputs": [
      {
        "material": "oxide-asteroid-chunk",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "oxide-asteroid-chunk",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "promethium-asteroid-chunk-recycling",
    "name": "Promethium asteroid chunk recycling",
    "outputs": [
      {
        "material": "promethium-asteroid-chunk",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "promethium-asteroid-chunk",
        "amount": 1
      }
    ],
    "spaceAge": true
  },
  {
    "id": "ice-recycling",
    "name": "Ice recycling",
    "outputs": [
      {
        "material": "ice",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "ice",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "carbon-recycling",
    "name": "Carbon recycling",
    "outputs": [
      {
        "material": "carbon",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "carbon",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "calcite-recycling",
    "name": "Calcite recycling",
    "outputs": [
      {
        "material": "calcite",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "calcite",
        "amount": 1
      }
    ],
    "spaceAge": true
  },
  {
    "id": "tungsten-ore-recycling",
    "name": "Tungsten ore recycling",
    "outputs": [
      {
        "material": "tungsten-ore",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "tungsten-ore",
        "amount": 1
      }
    ],
    "spaceAge": true
  },
  {
    "id": "tungsten-plate-recycling",
    "name": "Tungsten plate recycling",
    "outputs": [
      {
        "material": "tungsten-plate",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "tungsten-plate",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "tungsten-carbide-recycling",
    "name": "Tungsten carbide recycling",
    "outputs": [
      {
        "material": "tungsten-carbide",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "tungsten-carbide",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "copper-bacteria-recycling",
    "name": "Copper bacteria recycling",
    "outputs": [
      {
        "material": "copper-bacteria",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "copper-bacteria",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "iron-bacteria-recycling",
    "name": "Iron bacteria recycling",
    "outputs": [
      {
        "material": "iron-bacteria",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "iron-bacteria",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "yumako-seed-recycling",
    "name": "Yumako seed recycling",
    "outputs": [
      {
        "material": "yumako-seed",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "yumako-seed",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "jellynut-seed-recycling",
    "name": "Jellynut seed recycling",
    "outputs": [
      {
        "material": "jellynut-seed",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "jellynut-seed",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "biolab-recycling",
    "name": "Biolab recycling",
    "outputs": [
      {
        "material": "biolab",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "biolab",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "captive-biter-spawner-recycling",
    "name": "Captive biter spawner recycling",
    "outputs": [
      {
        "material": "captive-biter-spawner",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "captive-biter-spawner",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "biter-egg-recycling",
    "name": "Biter egg recycling",
    "outputs": [
      {
        "material": "biter-egg",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "biter-egg",
        "amount": 1
      }
    ],
    "spaceAge": true
  },
  {
    "id": "pentapod-egg-recycling",
    "name": "Pentapod egg recycling",
    "outputs": [
      {
        "material": "pentapod-egg",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "pentapod-egg",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "carbon-fiber-recycling",
    "name": "Carbon fiber recycling",
    "outputs": [
      {
        "material": "carbon-fiber",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "carbon-fiber",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "holmium-ore-recycling",
    "name": "Holmium ore recycling",
    "outputs": [
      {
        "material": "holmium-ore",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "holmium-ore",
        "amount": 1
      }
    ],
    "spaceAge": true
  },
  {
    "id": "holmium-plate-recycling",
    "name": "Holmium plate recycling",
    "outputs": [
      {
        "material": "holmium-plate",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "holmium-plate",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "lithium-recycling",
    "name": "Lithium recycling",
    "outputs": [
      {
        "material": "lithium",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "lithium",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "lithium-plate-recycling",
    "name": "Lithium plate recycling",
    "outputs": [
      {
        "material": "lithium-plate",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "lithium-plate",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "superconductor-recycling",
    "name": "Superconductor recycling",
    "outputs": [
      {
        "material": "superconductor",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "superconductor",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "fusion-power-cell-recycling",
    "name": "Fusion power cell recycling",
    "outputs": [
      {
        "material": "fusion-power-cell",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "fusion-power-cell",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "spoilage-recycling",
    "name": "Spoilage recycling",
    "outputs": [
      {
        "material": "spoilage",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "spoilage",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  },
  {
    "id": "space-platform-hub-recycling",
    "name": "Space platform hub recycling",
    "outputs": [
      {
        "material": "space-platform-hub",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "space-platform-hub",
        "amount": 1
      }
    ],
    "spaceAge": true
  },
  {
    "id": "tree-seed-recycling",
    "name": "Tree seed recycling",
    "outputs": [
      {
        "material": "tree-seed",
        "amount": 1
      }
    ],
    "inputs": [
      {
        "material": "tree-seed",
        "amount": 1
      }
    ],
    "alternate": true,
    "spaceAge": true
  }
];

export const materialById = new Map(materials.map(material => [material.id, material]));

export function recipesForMaterial(materialId: string): Recipe[] {
  return recipes.filter(candidate => candidate.outputs.some(output => output.material === materialId));
}
