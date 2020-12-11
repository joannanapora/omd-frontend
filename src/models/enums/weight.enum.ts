export enum Weight {
    LESS_THAN_4KG,
    BETWEEN_4_10KG,
    BETWEEN_11_18KG,
    BETWEEN_19_34KG,
    MORE_THAN_35KG,
};

export const mapOptionsToWeight = (weight): Weight => {
    if (weight === '< 4kg') {
        return Weight.LESS_THAN_4KG;
    }
    if (weight === '4-10kg') {
        return Weight.BETWEEN_4_10KG;
    }
    if (weight === '11-18kg') {
        return Weight.BETWEEN_11_18KG;
    }
    if (weight === '19-34kg') {
        return Weight.BETWEEN_19_34KG;
    }
    if (weight === ' > 35kg') {
        return Weight.MORE_THAN_35KG;
    }
};

