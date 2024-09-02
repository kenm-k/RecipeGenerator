let newdivsaltar_crafting = [];
let keysaltar_crafting = [];

function altar_crafting_AddKeys()
{
    keysaltar_crafting.push([`${keysaltar_crafting.length}`, "", ""]);
    altar_crafting_update();
}

function altar_crafting_RemoveKeys()
{
    keysaltar_crafting.pop();
    altar_crafting_update();
}

function altar_crafting_onchange(n)
{
    let key = document.getElementById(`altar_crafting_key${n}`);
    let itemortag = document.getElementById(`altar_crafting_itemortag${n}`);
    let idortag = document.getElementById(`altar_crafting_idortag${n}`);
    keysaltar_crafting[n] = [key.value, itemortag.value, idortag.value];
}

function altar_crafting_update()
{
    let parent = document.getElementById("altar_crafting_keys");
    for (let i = 0; i < newdivsaltar_crafting.length; i++)
    {
        newdivsaltar_crafting[i].remove();
    }
    newdivsaltar_crafting = [];

    for (let i = 0; i < keysaltar_crafting.length; i++)
    {
        let newdiv = document.createElement("div");
        newdivsaltar_crafting.push(newdiv);
        parent.appendChild(newdiv);

        newdiv.innerHTML = `
            グループ分け（同じグループならば、そのうちのどれかを使う） : <input type="text" placeholder="key" value="${keysaltar_crafting[i][0] ?? ''}" id="altar_crafting_key${i}" onchange="altar_crafting_onchange(${i});"><br>
            item: <input type="text" value="${keysaltar_crafting[i][1] ?? ''}" id="altar_crafting_itemortag${i}" onchange="altar_crafting_onchange(${i});">
            <br>
            tag : <input type="text" value="${keysaltar_crafting[i][2] ?? ''}" id="altar_crafting_idortag${i}" onchange="altar_crafting_onchange(${i});">
        `;
    }
}

function altar_crafting_generate()
{
    let obj = CreateNewObject();
    obj = AddElement(obj, CreateNewPair("type", '"touhou_little_maid:altar_crafting"'));

    let group = document.getElementById("altar_crafting_group").value;
    if (group != "") obj = AddElement(obj, CreateNewPair("group", `"${group}"`));

    let ingredients = CreateNewArray();

    let tempKeys = keysaltar_crafting;
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

    obj = AddElement(obj, CreateNewPair("ingredients", ingredients));

    let output = CreateNewObject();
    output = AddElement(output, CreateNewPair("type", `"${document.getElementById("altar_crafting_type").value}"`));
    if (document.getElementById("altar_crafting_nbt").value != "") output = AddElement(output, CreateNewPair("nbt", document.getElementById("altar_crafting_nbt").value));

    obj = AddElement(obj, CreateNewPair("output", output));

    obj = AddElement(obj, CreateNewPair("power", document.getElementById("altar_crafting_power").value));

    let op = document.getElementById("output");
    op.textContent = AutoIndent(obj);
}
