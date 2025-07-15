const escapeRegex = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // for cases that name has these chars
}
module.exports = escapeRegex