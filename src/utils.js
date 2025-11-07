function generateID() {
  return `film-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export { generateID };