import React from "react";
import { Tabs } from "antd";
import { Show, useEditController } from "react-admin";
import CategoryList from "./CategoryList";
import { SimpleForm } from "../../components/com/crud";
import CategoryIncludesForm from "./CategoryIncludesForm";
const { TabPane } = Tabs;
const CategoryShow = props => {
    const { record, resource } = useEditController(props);
    if (!record)
        return null;
    let { id } = record;
    const handleSubmit = record => {
        console.log(id, record);
    }
    return (<Show {...props}>
        <Tabs>
            <TabPane tab="Categoría" key="categoria">
                <CategoryList {...props} />
            </TabPane>
            <TabPane tab="Beneficio" key="beneficio">
                <CategoryIncludesForm {...props} />
            </TabPane>
        </Tabs>
    </Show>)
}
export default CategoryShow;