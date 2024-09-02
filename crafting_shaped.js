let newdivs = [];
let keys = [];

function Crafting_shaped_AddKeys()
{
    keys.push(["", "", ""]);
    Crafting_shaped_update();
}

function Crafting_shaped_RemoveKeys()
{
    keys.pop();
    Crafting_shaped_update();
}

function Crafting_shaped_onchange(n)
{
    let key = document.getElementById(`Crafting_shaped_key${n}`);
    let itemortag = document.getElementById(`Crafting_shaped_itemortag${n}`);
    let idortag = document.getElementById(`Crafting_shaped_idortag${n}`);
    keys[n] = [key.value, itemortag.value, idortag.value];

    Crafting_shaped_cell_update();
}

function Crafting_shaped_cell_update()
{
    for (let i = 0; i < 9; i++)
    {
        let cell = document.getElementById(`Crafting_shaped_cell${i}`);

        let added = [];

        let options = `<option value=" ">無</option>`;
        for (let j = 0; j < keys.length; j++)
        {
            if (added.includes(keys[j][0])) continue;
            if (keys[j][0] == cell.value)
                options += `<option selected>${keys[j][0]}</option>`;
            else
            options += `<option>${keys[j][0]}</option>`;
            added.push(keys[j][0]);
        }

        cell.innerHTML = options;
    }
}

function Crafting_shaped_update()
{
    let parent = document.getElementById("Crafting_shaped_keys");
    for (let i = 0; i < newdivs.length; i++)
    {
        newdivs[i].remove();
    }
    newdivs = [];

    for (let i = 0; i < keys.length; i++)
    {
        let newdiv = document.createElement("div");
        newdivs.push(newdiv);
        parent.appendChild(newdiv);

        newdiv.innerHTML = `
            key（1文字の半角英数記号） : <input type="text" placeholder="key" value="${keys[i][0] ?? ''}" id="Crafting_shaped_key${i}" onchange="Crafting_shaped_onchange(${i});"><br>
            item or tag : <select id="Crafting_shaped_itemortag${i}" onchange="Crafting_shaped_onchange(${i});">
            ${keys[i][1] != "tag" ? "<option selected>item</option><option>tag</option></select>" : "<option>item</option><option selected>tag</option></select>"}
            <br>
            id or tag : <input type="text" value="${keys[i][2] ?? ''}" id="Crafting_shaped_idortag${i}" onchange="Crafting_shaped_onchange(${i});">
        `;
    }
}

function Crafting_shaped_generate()
{
    let obj = CreateNewObject();
    obj = AddElement(obj, CreateNewPair("type", '"minecraft:crafting_shaped"'));
    let pattern = CreateNewArray();
    
    let cells = [];
    for (let i = 0; i < 9; i++)
    {
        cells.push(document.getElementById(`Crafting_shaped_cell${i}`).value);
    }
    
    pattern = AddElement(pattern, `"${cells[0]}${cells[1]}${cells[2]}"`);
    pattern = AddElement(pattern, `"${cells[3]}${cells[4]}${cells[5]}"`);
    pattern = AddElement(pattern, `"${cells[6]}${cells[7]}${cells[8]}"`);

    obj = AddElement(obj, CreateNewPair("pattern", pattern));

    let key = CreateNewObject();

    let tempKeys = keys;
    tempKeys.sort((a, b) => {if (a[0] < b[0]) return -1; if (a[0] > b[0]) return 1; return 0;} );
    for (let i = 0; i < tempKeys.length;)
    {
        let sames = [];
        let skey = tempKeys[i][0];
        while (true)
        {
            let ukey = CreateNewObject();
            ukey = AddElement(ukey, CreateNewPair(tempKeys[i][1], `"${tempKeys[i][2]}"`));
            sames.push(ukey);
            i++;
            if (i >= tempKeys.length || tempKeys[i][0] != skey) break;
        }
        
        if (sames.length == 1)
        {
            key = AddElement(key, CreateNewPair(skey, sames[0]));
        }
        else
        {
            let tempArray = CreateNewArray();
            for (let j = 0; j < sames.length; j++)
            {
                tempArray = AddElement(tempArray, sames[j]);
            }
            key = AddElement(key, CreateNewPair(skey, tempArray));
        }
    }

    obj = AddElement(obj, CreateNewPair("key", key));

    let result = CreateNewObject();
    result = AddElement(result, CreateNewPair("item", `"${document.getElementById("Crafting_shaped_result_id").value}"`));
    result = AddElement(result, CreateNewPair("count", document.getElementById("Crafting_shaped_result_count").value));

    obj = AddElement(obj, CreateNewPair("result", result));

    let output = document.getElementById("output");
    output.textContent = AutoIndent(obj);
}
