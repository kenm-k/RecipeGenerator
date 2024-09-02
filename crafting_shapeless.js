let newdivsShapeless = [];
let keysShapeless = [];

function Crafting_shapeless_AddKeys()
{
    keysShapeless.push([`${keysShapeless.length}`, "", ""]);
    Crafting_shapeless_update();
}

function Crafting_shapeless_RemoveKeys()
{
    keysShapeless.pop();
    Crafting_shapeless_update();
}

function Crafting_shapeless_onchange(n)
{
    let key = document.getElementById(`Crafting_shapeless_key${n}`);
    let itemortag = document.getElementById(`Crafting_shapeless_itemortag${n}`);
    let idortag = document.getElementById(`Crafting_shapeless_idortag${n}`);
    keysShapeless[n] = [key.value, itemortag.value, idortag.value];
}

function Crafting_shapeless_update()
{
    let parent = document.getElementById("Crafting_shapeless_keys");
    for (let i = 0; i < newdivsShapeless.length; i++)
    {
        newdivsShapeless[i].remove();
    }
    newdivsShapeless = [];

    for (let i = 0; i < keysShapeless.length; i++)
    {
        let newdiv = document.createElement("div");
        newdivsShapeless.push(newdiv);
        parent.appendChild(newdiv);

        newdiv.innerHTML = `
            グループ分け（同じグループならば、そのうちのどれかを使う） : <input type="text" placeholder="key" value="${keysShapeless[i][0] ?? ''}" id="Crafting_shapeless_key${i}" onchange="Crafting_shapeless_onchange(${i});"><br>
            item: <input type="text" value="${keysShapeless[i][1] ?? ''}" id="Crafting_shapeless_itemortag${i}" onchange="Crafting_shapeless_onchange(${i});">
            <br>
            tag : <input type="text" value="${keysShapeless[i][2] ?? ''}" id="Crafting_shapeless_idortag${i}" onchange="Crafting_shapeless_onchange(${i});">
        `;
    }
}

function Crafting_shapeless_generate()
{
    let obj = CreateNewObject();
    obj = AddElement(obj, CreateNewPair("type", '"minecraft:crafting_shapeless"'));

    let group = document.getElementById("Crafting_shapeless_group").value;
    if (group != "") obj = AddElement(obj, CreateNewPair("group", `"${group}"`));

    let ingredients = CreateNewArray();

    let tempKeys = keysShapeless;
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

    let result = CreateNewObject();
    result = AddElement(result, CreateNewPair("item", `"${document.getElementById("Crafting_shapeless_result_id").value}"`));
    result = AddElement(result, CreateNewPair("count", document.getElementById("Crafting_shapeless_result_count").value));

    obj = AddElement(obj, CreateNewPair("result", result));

    let output = document.getElementById("output");
    output.textContent = AutoIndent(obj);
}
