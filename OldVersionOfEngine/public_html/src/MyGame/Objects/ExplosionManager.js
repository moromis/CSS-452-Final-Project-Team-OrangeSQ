/*jslint node: true, vars: true */
/*global gEngine: false, GameObjectSet: false, SpriteRenderable: false, 
 * HelperFunctions: false, Manager: false, Explosion: false */
/* find out more about jslint: http://www.jslint.com/help.html */

function ExplosionManager (spriteTexture) {
    
    Manager.call(this, spriteTexture, Explosion, 0, 0, false);
    
}
gEngine.Core.inheritPrototype(ExplosionManager, Manager);

