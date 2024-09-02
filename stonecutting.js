let newdivsStonecutting = [];
let keysStonecutting = [];

function stonecutting_AddKeys()
{
    keysStonecutting.push([`${keysStonecutting.length}`, "", ""]);
    stonecutting_update();
}

function stonecutting_RemoveKeys()
{
    keysStonecutting.pop();
    stonecutting_update();
}

function stonecutting_onchange(n)
{
    let key = document.getElementById(`stonecutting_key${n}`);
    let itemortag = document.getElementById(`stonecutting_itemortag${n}`);
    let idortag = document.getElementById(`stonecutting_idortag${n}`);
    keysStonecutting[n] = [key.value, itemortag.value, idortag.value];
}

function stonecutting_update()
{
    let parent = document.getElementById("stonecutting_keys");
    for (let i = 0; i < newdivsStonecutting.length; i++)
    {
        newdivsStonecutting[i].remove();
    }
    newdivsStonecutting = [];

    for (let i = 0; i < keysStonecutting.length; i++)
    {
        let newdiv = document.createElement("div");
        newdivsStonecutting.push(newdiv);
        parent.appendChild(newdiv);

        newdiv.innerHTML = `
            グループ分け（同じグループならば、そのうちのどれかを使う） : <input type="text" placeholder="key" value="${keysStonecutting[i][0] ?? ''}" id="stonecutting_key${i}" onchange="stonecutting_onchange(${i});"><br>
            item : <input type="text" value="${keysStonecutting[i][1] ?? ''}" id="stonecutting_itemortag${i}" onchange="stonecutting_onchange(${i});">
            <br>
            tag : <input type="text" value="${keysStonecutting[i][2] ?? ''}" id="stonecutting_idortag${i}" onchange="stonecutting_onchange(${i});">
        `;
    }
}

function stonecutting_generate()
{
    let obj = CreateNewObject();
    obj = AddElement(obj, CreateNewPair("type", '"minecraft:stonecutting"'));

    let group = document.getElementById("stonecutting_group").value;
    if (group != "") obj = AddElement(obj, CreateNewPair("group", `"${group}"`));

    let ingredients = CreateNewArray();

    let tempKeys = keysStonecutting;
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

    obj = AddElement(obj, CreateNewPair("result", `"${document.getElementById("stonecutting_result_id").value}"`));
    obj = AddElement(obj, CreateNewPair("count", `${document.getElementById("stonecutting_result_count").value}`));

    let output = document.getElementById("output");
    output.textContent = AutoIndent(obj);
}
