String.prototype.capitalise = function() {
  return this.replace(this.substr(0,1),this.substr(0,1).toUpperCase());
}

function getURLParam (oTarget, sVar) {
  return decodeURI(oTarget.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}
