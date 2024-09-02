function metallurgic_infusing_generate()
{
    let obj = CreateNewObject();
    obj = AddElement(obj, CreateNewPair("type", `"mekanism:metallurgic_infusing"`));
    if (document.getElementById("metallurgic_infusing_group").value != "") obj = AddElement(obj, CreateNewPair("group", `"${document.getElementById("metallurgic_infusing_group").value}"`));

    let chemicalInput = CreateNewObject();
    chemicalInput = AddElement(chemicalInput, CreateNewPair("amount", `${document.getElementById("metallurgic_infusing_chemical_amount").value}`));
    chemicalInput = AddElement(chemicalInput, CreateNewPair("tag", `"${document.getElementById("metallurgic_infusing_chemical_mode").value}"`));

    obj = AddElement(obj, CreateNewPair("chemicalInput", chemicalInput));

    let itemInput = CreateNewObject();
    itemInput = AddElement(itemInput, CreateNewPair("amount", `${document.getElementById("metallurgic_infusing_input_amount").value}`));

    let ingredient = CreateNewObject();
    if (document.getElementById("metallurgic_infusing_input_id").value != "") ingredient = AddElement(ingredient, CreateNewPair("item", `"${document.getElementById("metallurgic_infusing_input_id").value}"`));
    if (document.getElementById("metallurgic_infusing_input_tag").value != "") ingredient = AddElement(ingredient, CreateNewPair("tag", `"${document.getElementById("metallurgic_infusing_input_tag").value}"`));

    itemInput = AddElement(itemInput, CreateNewPair("ingredient", ingredient));

    obj = AddElement(obj, CreateNewPair("itemInput", itemInput));

    let output = CreateNewObject();
    output = AddElement(output, CreateNewPair("item", `"${document.getElementById("metallurgic_infusing_output_id").value}"`));
    output = AddElement(output, CreateNewPair("count", `${document.getElementById("metallurgic_infusing_output_count").value}`));

    obj = AddElement(obj, CreateNewPair("output", output));

    let op = document.getElementById("output");
    op.textContent = AutoIndent(obj);
}