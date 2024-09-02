function CreateNewObject()
{
    return ["{", "", "}"];
}

function CreateNewArray()
{
    return ["[", "", "]"];
}

function AddElement(array, element)
{
    let t = array[array.length - 3];
    array[array.length - 2] = `${t == "{" || t == "[" ? "" : ","}${ArrayToString(element)}`;
    array.splice(array.length - 1, 0, "");
    return array;
}

function ArrayToString(array)
{
    if (typeof(array) != "object") return array;
    let output = "";
    for (let i = 0; i < array.length; i++)
        output += array[i];
    return output;
}

function StringToArray(str)
{
    let output = [];
    for (let i = 0; i < str.length; i++)
        output.push(str.substr(i, 1));
    return output;
}

function CreateNewPair(key, value)
{
    return `"${key}" : ${ArrayToString(value)}`;
}

function AutoIndent(array)
{
    array = ArrayToString(array);
    array = StringToArray(array);

    let indentCount = 0;
    let haveLineBroken = false;
    for (let i = 0; i < array.length; i++)
    {
        if (haveLineBroken)
        {
            if ((array[i] == "}" || array[i] == "]") && (array[i - 2] == "{" || array[i - 2] == "["))
            {
                indentCount--;
            }
            for (let j = 0; j < indentCount; j++)
            {
                array.splice(i, 0, "\t");
                i++;
            }
            haveLineBroken = false;
        }
        else
        {
            if (array[i] == "}" || array[i] == "]")
            {
                indentCount--;
                array.splice(i, 0, "\n");
                i++;
                for (let j = 0; j < indentCount; j++)
                {
                    array.splice(i, 0, "\t");
                    i++;
                }
                continue;
            }
        }

        if (array[i] == "{" || array[i] == "[")
        {
            indentCount++;
            haveLineBroken = true;
            array.splice(i + 1, 0, "\n");
            i++;
        }
        else if (array[i] == ",")
        {
            haveLineBroken = true;
            array.splice(i + 1, 0, "\n");
            i++;
        }
        else if (array[i] == "}" || array[i] == "]")
        {
            indentCount--;
            haveLineBroken = true;
            array.splice(i + 1, 0, "\n");
            i++;
        }
    }
    return ArrayToString(array);
}