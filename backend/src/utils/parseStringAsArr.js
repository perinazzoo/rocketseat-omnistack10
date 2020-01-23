module.exports = parseStrAsArr = arrAsStr =>
  arrAsStr.split(",").map(tech => tech.trim());
