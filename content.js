const checkAlignAd = () => {
    const alignAd = document.querySelector('#iqd_align_Ad');
    if (!alignAd) {
        return {
            message: 'Alignment Container with ID #iqd_align_Ad has not been found',
            success: false
        };
    }
    return {
        message: "Alignment Container wit ID #iqd_align_Ad has been found",
        success: true
    }
}
const checkAlignAdPosition = () => {
    const alignAd = document.querySelector('#iqd_align_Ad');
    if (!alignAd) {
        return {
            message: 'Without Alignment Container with ID #iqd_align_Ad no Align Check can be produced',
            success: false
        };
    }
    const alignAdWidth = alignAd.getBoundingClientRect().width;
    const leftMargin = alignAd.getBoundingClientRect().left;
    const alignAdRight = alignAd.getBoundingClientRect().right;
    const rightMargin = window.innerWidth - alignAdRight;
    let message;
    let misAlignedValue;
    if (leftMargin === rightMargin) {
        return { message: `Align Ad is centered, Align Ad Width: ${alignAdWidth}`, success: true }
    } else {
        if (leftMargin >= rightMargin) {
            misAlignedValue = leftMargin - rightMargin;
            message = `Align Ad is not centered. Pixel misalignment to the right: ${misAlignedValue}`;
        } else {
            misAlignedValue = rightMargin - leftMargin;
            message = `Align Ad is not centered. It misaligns to the left: ${misAlignedValue}`;
        }
    }

    return {
        message: `${message},  Align Ad Width ${alignAdWidth}`,
        success: true
    };

}

