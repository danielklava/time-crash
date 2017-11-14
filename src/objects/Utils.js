export function getGroundPositionY (GameObject){
	GameObject.height - GameObject.cache.getImage('ground').height;
}

export function getObjectPositionAboveGround (spriteName, GameObject){
	return getGroundPositionY() - GameObject.cache.getImage(spriteName).height;
}

export function checkOverlap (spriteA, spriteB) {
	var boundsA = spriteA.getBounds();
	var boundsB = spriteB.getBounds();

	return Phaser.Rectangle.intersects(boundsA, boundsB);
}