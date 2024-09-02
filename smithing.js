function smithing_generate()
{
    let obj = CreateNewObject();
    obj = AddElement(obj, CreateNewPair("type", `"${document.getElementById("smithing_mode").value}"`));
    let group = document.getElementById("smithing_group").value;
    if (group != "") obj = AddElement(obj, CreateNewPair("group", `"${group}"`));

    let template = CreateNewObject();
    let template_item = document.getElementById("smithing_template_item").value;
    let template_tag = document.getElementById("smithing_template_tag").value;
    if (template_item != "") template = AddElement(template, CreateNewPair("item", `"${template_item}"`));
    if (template_tag != "") template = AddElement(template, CreateNewPair("item", `"${template_tag}"`));

    obj = AddElement(obj, CreateNewPair("template", template));

    let base = CreateNewObject();
    let base_item = document.getElementById("smithing_base_item").value;
    let base_tag = document.getElementById("smithing_base_tag").value;
    if (base_item != "") base = AddElement(base, CreateNewPair("item", `"${base_item}"`));
    if (base_tag != "") base = AddElement(base, CreateNewPair("item", `"${base_tag}"`));

    obj = AddElement(obj, CreateNewPair("base", base));

    let addition = CreateNewObject();
    let addition_item = document.getElementById("smithing_addition_item").value;
    let addition_tag = document.getElementById("smithing_addition_tag").value;
    if (addition_item != "") addition = AddElement(addition, CreateNewPair("item", `"${addition_item}"`));
    if (addition_tag != "") addition = AddElement(addition, CreateNewPair("item", `"${ addition_tag}"`));

    obj = AddElement(obj, CreateNewPair("addition", addition));

    let result = CreateNewObject();
    result = AddElement(result, CreateNewPair("item", `"${document.getElementById("smithing_result_id").value}"`));

    if (document.getElementById("smithing_mode").value == "minecraft:smithing_transform") obj = AddElement(obj, CreateNewPair("result", result));

    let output = document.getElementById("output");
    output.textContent = AutoIndent(obj);
}