function warrior_strat(ctx)
{
    for(var x = 1; x < character_list.length; x++)
    {
        if(safties)
            send_cm(character_list[x].name, character);
    }
}

function priest_strat(ctx)
{
    function on_cm(name, data)
    {
        if (name == character_list[0].name)
        {
            xmove(data.character.x, data.character.y);
        }
    }
}

function ranger_strat(ctx)
{
    say ("Hello");
}

function mage_strat(ctx)
{
    say ("Hello");
}

function merchant_strat(ctx)
{
    say ("Hello");
}

function init_party(ctx)
{
    if (ctx.party_leader)
    {
        for (var x = 1; x < character_list.length; x++)
        {
            start_character(character_list[x].name);
            command_character(character_list[x].name, "load_code(1)");
            send_party_invite(character_list[x].name, 0);
        }
    }
    else
        accept_party_invite("Scipster");
    ctx.init = true;
}

let character_list =
[
    {
        name: "Scipster",
        type: "warrior",
        strategy: warrior_strat
    },
    {
        name: "ScipPriest",
        type: "priest",
        strategy: priest_strat
    },
    {
        name: "Scipster2",
        type: "ranger",
        strategy: ranger_strat
    },
    // {
    //     name: "Scipster3",
    //     type: "mage",
    //     strategy: mage_strat()
    // },
    {
        name: "ScipMerch",
        type: "merchant",
        strategy: merchant_strat
    }
]

function main()
{
    let ctx = {
        init: false,
        combat: true,
        party_leader: false,
        char: null,
    }
    for (var i = 0; i < character_list.length; i++)
        if (character.name == character_list[i].name)
            ctx.char = character_list[i];
    if (character.ctype == "warrior")
        ctx.party_leader = true;
    if (!ctx.init)
        init_party(ctx);
    setInterval(function() {
        ctx.char.strategy(ctx);
    }, 1000/4); // Loop every 1/4 second.
}

main();