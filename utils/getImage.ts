interface Attributes {
  url?: string;
}

interface Data {
  attributes?: Attributes;
}

interface Obj {
  data?: Data;
}

export async function getImage(obj: Obj = {}) {
  return obj?.data?.attributes?.url || "";
}
