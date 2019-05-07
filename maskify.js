// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!

// logs my party in, has them join together and then it starts hunting.
function init_party()
{
	get_active_characters();
	start_character(name,code_slot_or_name);
	send_party_invite(name,is_request)
	accept_party_invite();
}

function item_quantity(name)
{
	for(var i=0;i<42;i++)
	{
		if(character.items[i] && character.items[i].name==name) return character.items[i].q||0;
	}
	return 0;
}

function in_danger ()
{
    if (item_quantity("hpot0") < 5) return (true);
    else if (character.hp/character.max_hp < 0.3) return (true);
    return (false);
}

function run_away()
{
    set_message("Retreat!");
    use("hpot0");
    use("hpot0");
    use_skill("charge", null);
    smart_move({to:"potions",return:true},function() {buy("mpot0",10);});
}

function use_hp_or_mp()
{
	if(safeties && mssince(last_potion) < min(201,character.ping*3)) return;
	var used=false;
    if(new Date() < parent.next_skill.use_hp) return;
	else if(character.hp/character.max_hp < 0.6) use('use_hp'),used=true;
	else if(character.mp < character.max_mp - 200) use('use_mp'),used=true;
	// else if(character.hp<character.max_hp) use('use_hp'),used=true;
	// else if(character.mp<character.max_mp) use('use_mp'),used=true;
	if(used) last_potion = new Date();
}

var attack_mode=true
var in_danger = false;

setInterval(function()
{
    if (in_danger)
    {
        run_away();
        in_danger = false;
    }
	use_hp_or_mp();
	loot();

	if(!attack_mode || character.rip || is_moving(character)) return;

	var target=get_targeted_monster();
	if(!target)
	{
		target=get_nearest_monster({min_xp:100,max_att:120});
		if(target) change_target(target);
		else
		{
			set_message("No Monsters");
			return;
		}
	}
	
	if(!in_attack_range(target))
	{
		move(
			character.x+(target.x-character.x)/2,
			character.y+(target.y-character.y)/2
			);
		// Walk half the distance
	}
	else if(can_attack(target))
	{
		set_message("Attacking");
		attack(target);
	}

},1000/4); // Loops every 1/4 seconds.

// Learn Javascript: https://www.codecademy.com/learn/learn-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
