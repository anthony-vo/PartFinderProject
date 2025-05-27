const BASE_URL = "/api";

export async function fetchMakes() {
  const result = await fetch(`${BASE_URL}/makes?q=makes`);
  return result.json();
}

export async function fetchModels(make) {
  const result = await fetch(
    `${BASE}/models?q=models&make=${encodeURIComponent(make)}`
  );
  return result.json();
}

export async function fetchTypes(make, model) {
  const result = await fetch(
    `${BASE}/types?q=types&make=${encodeURIComponent(
      make
    )}&model=${encodeURIComponent(model)}`
  );
  return result.json();
}

export async function fetchParts(make, model, type) {
  const result = await fetch(
    `${BASE}/parts?q=parts&make=${encodeURIComponent(
      make
    )}&model=${encodeURIComponent(model)}&type=${encodeURIComponent(type)}`
  );
  return result.json();
}
