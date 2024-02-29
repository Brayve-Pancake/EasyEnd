// START OF ZERION RESPONSE INTERFACES -------------------------
// Success response for chains (HTTP 200)
interface ChainIcon {
  url: string;
}

interface ChainExplorer {
  name: string;
  token_url_format: string;
  tx_url_format: string;
  home_url: string;
}

interface ChainRpc {
  internal_server_url_format: string;
  public_servers_url: string[];
}

interface ChainFlags {
  supports_trading: boolean;
  supports_sending: boolean;
  supports_bridge: boolean;
}

interface ChainAttributes {
  external_id: string;
  name: string;
  icon: ChainIcon;
  explorer: ChainExplorer;
  rpc: ChainRpc;
  flags: ChainFlags;
}

interface ChainRelationshipData {
  type: string;
  id: string;
}

interface ChainRelationship {
  links: {
    related: string;
  };
  data: ChainRelationshipData;
}

interface ChainData {
  type: string;
  id: string;
  attributes: ChainAttributes;
  relationships: {
    native_fungible: ChainRelationship;
    wrapped_native_fungible: ChainRelationship;
  };
}

interface ChainLinks {
  self: string;
}

export interface PortfolioResponse {
  links: ChainLinks;
  data: ChainData[];
}

// Error responses for various HTTP status codes (400, 401, 429)
interface ErrorDetail {
  title: string;
  detail: string;
}
export interface ErrorResponse {
  errors: ErrorDetail[];
}

// END OF ZERION RESPONSE INTERFACES -------------------------
