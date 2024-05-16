/**
 * @since 0.0.1
 */
export type Plugin = {
  name: string;
  translations?: Record<string, string>;
  src: string;
  icon: string;
  requireDoc?: boolean;
  active?: boolean;
  position: ("top" | "middle" | "bottom") | number;
};

/**
 * @since 0.0.1
 */
export type PluginSet = { menu: Plugin[]; editor: Plugin[] };
