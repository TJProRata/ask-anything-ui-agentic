/**
 * TileGrid Component
 * Grid of content tiles for gist mini-sites
 *
 * TODO: Implement full tile rendering with:
 * - Different tile types (text, image, link, etc.)
 * - Responsive grid layout
 * - Tile interactions
 */

interface Tile {
  id: string;
  kind: string;
  title: string;
  content: string;
}

interface TileGridProps {
  tiles?: Tile[];
}

export default function TileGrid({ tiles = [] }: TileGridProps) {
  if (tiles.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>Tile Grid - No tiles to display</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {tiles.map((tile) => (
        <div
          key={tile.id}
          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
        >
          <h3 className="font-semibold text-lg mb-2">{tile.title}</h3>
          <p className="text-gray-600 text-sm">{tile.content}</p>
          <div className="mt-2 text-xs text-gray-400">Type: {tile.kind}</div>
        </div>
      ))}
    </div>
  );
}
