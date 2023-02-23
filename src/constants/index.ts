import { FoyerElems, MapElems } from "../types/index.js";

const map: MapElems[][] | string[][] = [
  ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL"],
  ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"],
  ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "LIBRARY", "SPACE", "WALL"],
  ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"],
  ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "DINING_ROOM", "SPACE", "WALL"],
  ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "BALLROOM", "SPACE", "SPACE", "SPACE", "WALL"],
  ["WALL", "SPACE", "SPACE", "SPACE", "STUDY", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"],
  ["WALL", "SPACE", "SPACE", "SECRET_ROOM", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"],
  ["WALL", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "CRYPT", "SPACE", "SPACE", "WALL"],
  ["WALL", "FOYER", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "WALL"],
  ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL"]
];

const foyerMap: FoyerElems[][] = [
  ["DARK", "DARK", "DARK", "DARK", "GATE_ENTER", "DARK", "DARK"],
  ["DARK", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "DARK"],
  ["DARK", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "DARK"],
  ["DARK", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "DARK"],
  ["GATE_EXIT", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "DARK"],
  ["DARK", "SPACE", "SPACE", "SPACE", "SPACE", "LANTERN", "DARK"],
  ["DARK", "DARK", "DARK", "DARK", "DARK", "DARK", "DARK"]
];

export {
  map,
  foyerMap
};