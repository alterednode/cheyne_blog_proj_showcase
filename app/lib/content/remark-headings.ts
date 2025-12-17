export function remarkHeadings() {
  return (tree: any) => {
    const idCounts = new Map<string, number>();

    tree.children.forEach((node: any) => {
      if (node.type === "heading" && node.children?.[0]) {
        // Extract text from heading
        const text = node.children
          .map((child: any) => child.value || "")
          .join("")
          .trim();

        // Generate ID
        let id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim();

        // Handle duplicate IDs by appending a counter
        const count = (idCounts.get(id) || 0) + 1;
        idCounts.set(id, count);
        
        if (count > 1) {
          id = `${id}-${count}`;
        }

        node.data = node.data || {};
        node.data.hProperties = node.data.hProperties || {};
        node.data.hProperties.id = id;
      }
    });
  };
}
