/**
 *  Converts the inputed vector into a P5 Vector (Only can map vector2 and vector3)
 * 
 * @param {THREE.Vector2 || THREE.Vector3 || P5.Vector || Object} vector - the vector you want to convert
 * @param { {x: Array, y: Array, z: Array} } [mapping=] - the how to set map the input vector to the output vector
 * @returns {P5.Vector}
 */
function convertToP5Vector(vector, mapping) {
  const defultMapping = {
    x: [0, "x"],
    y: [1, "y"],
    z: [2, "z"]
  }

  mapping = {...defultMapping, ...mapping} // "Defults" the mapping

  let returnVector = createVector()

  if (Array.IsArray(vector)) {
    returnVector.x = vector[mapping.x[0]]
    returnVector.y = vector[mapping.y[0]]
    returnVector.z = vector[mapping.z[0]]
  }
  else {
    returnVector.x = vector[mapping.x[1]]
    returnVector.y = vector[mapping.y[1]]
    returnVector.z = vector[mapping.z[1]]
  }
  return returnVector
}

/**
 * Converts the inputed vector into a THREE.js Vecter (Only coverts into vector2 and vector3)
 * 
 * @param {THREE.Vector2 || THREE.Vector3 || P5.Vector || Object} vector - the vector you want to convert
 * @param { {x: Array, y: Array, z: Array} } [mapping=] - the how to set map the input vector to the output vector
 * @returns {THREE.Vector2 || THREE.Vector3}
 */
function convertToTHREEVector(vector, mapping) {
  const defultMapping = {
    x: [0, "x"],
    y: [1, "y"],
    z: [2, "z"]
  }

  const is3dVector = Boolean(vector.z)

  mapping = {...defultMapping, ...mapping} // "Defults" the mapping

  let returnVector = is3dVector ? new THREE.Vector3() : new THREE.Vector2()

  if (Array.IsArray(vector)) {
    returnVector.x = vector[mapping.x[0]]
    returnVector.y = vector[mapping.y[0]]
    returnVector.z = vector[mapping.z[0]]
  }
  else {
    returnVector.x = vector[mapping.x[1]]
    returnVector.y = vector[mapping.y[1]]
    returnVector.z = vector[mapping.z[1]]
  }

  return returnVector
}

/**
 * Converts the inputed vector into a THREE.js Vecter (Only coverts into vector2 and vector3)
 * 
 * @param {THREE.Vector2 || THREE.Vector3 || P5.Vector || Object} vector - the vector you want to convert
 * @param { {x: Array, y: Array, z: Array} } [mapping=] - the how to set map the input vector to the output vector
 * @returns {Array<Number>}
 */
function convertToArrayVector(vector, mapping) {
  const defultMapping = {
    x: [0, "x"],
    y: [1, "y"],
    z: [2, "z"]
  }

  mapping = {...defultMapping, ...mapping} // "Defults" the mapping

  let returnVector = [];

  if (Array.IsArray(vector)) {
    returnVector[mapping.x[0]] = vector[mapping.x[0]]
    returnVector[mapping.y[0]] = vector[mapping.y[0]]
    returnVector[mapping.z[0]] = vector[mapping.z[0]]
  }
  else {
    returnVector[0] = vector[mapping.x[1]]
    returnVector[1] = vector[mapping.y[1]]
    returnVector[2] = vector[mapping.z[1]]
  }

  return returnVector
}