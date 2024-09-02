let newdivsSmelting = [];
let keysSmelting = [];

function smelting_AddKeys()
{
    keysSmelting.push(["", "", ""]);
    smelting_update();
}

function smelting_RemoveKeys()
{
    keysSmelting.pop();
    smelting_update();
}

function smelting_onchange(n)
{
    let key = document.getElementById(`smelting_key${n}`);
    let itemortag = document.getElementById(`smelting_itemortag${n}`);
    let idortag = document.getElementById(`smelting_idortag${n}`);
    keysSmelting[n] = [key.value, itemortag.value, idortag.value];
}

function smelting_update()
{
    let parent = document.getElementById("smelting_keys");
    for (let i = 0; i < newdivsSmelting.length; i++)
    {
        newdivsSmelting[i].remove();
    }
    newdivsSmelting = [];

    for (let i = 0; i < keysSmelting.length; i++)
    {
        let newdiv = document.createElement("div");
        newdivsSmelting.push(newdiv);
        parent.appendChild(newdiv);

        newdiv.innerHTML = `
            グループ分け（同じグループならば、そのうちのどれかを使う） : <input type="text" placeholder="key" value="${keysSmelting[i][0] ?? ''}" id="smelting_key${i}" onchange="smelting_onchange(${i});"><br>
            item : <input type="text" value="${keysSmelting[i][1] ?? ''}" id="smelting_itemortag${i}" onchange="smelting_onchange(${i});">
            <br>
            tag : <input type="text" value="${keysSmelting[i][2] ?? ''}" id="smelting_idortag${i}" onchange="smelting_onchange(${i});">
        `;
    }
}

function smelting_generate()
{
    let obj = CreateNewObject();
    obj = AddElement(obj, CreateNewPair("type", '"minecraft:smelting"'));

    let group = document.getElementById("smelting_group").value;
    if (group != "") obj = AddElement(obj, CreateNewPair("group", `"${group}"`));

    let ingredients = CreateNewArray();

    let tempKeys = keysSmelting;
    tempKeys.sort((a, b) => {if (a[0] < b[0]) return -1; if (a[0] > b[0]) return 1; return 0;} );
    for (let i = 0; i < tempKeys.length;)
    {
        let sames = [];
        let skey = tempKeys[i][0];
        while (true)
        {
            let ukey = CreateNewObject();
            if (tempKeys[i][1] != "") ukey = AddElement(ukey, CreateNewPair("item", `"${tempKeys[i][1]}"`));
            if (tempKeys[i][2] != "") ukey = AddElement(ukey, CreateNewPair("tag", `"${tempKeys[i][2]}"`));
            sames.push(ukey);
            i++;
            if (i >= tempKeys.length || tempKeys[i][0] != skey) break;
        }
        
        if (sames.length == 1)
        {
            ingredients = AddElement(ingredients, sames[0]);
        }
        else
        {
            let tempArray = CreateNewArray();
            for (let j = 0; j < sames.length; j++)
            {
                tempArray = AddElement(tempArray, sames[j]);
            }
            ingredients = AddElement(ingredients, tempArray);
        }
    }

    obj = AddElement(obj, CreateNewPair("ingredient", ingredients));

    obj = AddElement(obj, CreateNewPair("result", `"${document.getElementById("smelting_result_id").value}"`));

    obj = AddElement(obj, CreateNewPair("experience", document.getElementById("smelting_expAmount").value));

    obj = AddElement(obj, CreateNewPair("cookingtime", document.getElementById("smelting_waitingtime").value));

    let output = document.getElementById("output");
    output.textContent = AutoIndent(obj);
}
