const ProductCategory=require("../models/product-category.model")
module.exports.getSubCategory = async (parentId) => {
    const getCategory = async (parentId) => {
        try {
            console.log(`Fetching subcategories for parent ID: ${parentId}`);
            const subs = await ProductCategory.find({
                parent_id: parentId,
                status: "active",
                deleted: false
            });

            let allSub = [...subs];

            for (const sub of subs) {
                console.log(`Fetching child categories for sub ID: ${sub.id}`);
                const childs = await getCategory(sub.id);
                allSub = allSub.concat(childs);
            }

            return allSub;
        } catch (error) {
            console.error("Error fetching subcategories:", error);
            throw error; // Ném lỗi để xử lý tại hàm gọi
        }
    };

    try {
        console.log(`Starting category fetch for parent ID: ${parentId}`);
        const result = await getCategory(parentId);
        console.log(`Finished fetching categories for parent ID: ${parentId}`);
        return result;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return []; // Trả về mảng rỗng nếu có lỗi xảy ra
    }
};
