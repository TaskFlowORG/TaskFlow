const timeLine = () => {

    interface Task {
        date: Date,
        id: number,
        name: string,
        uniProperties: Array<PropertyValue>,
        userProperties: Array<PropertyValue>,
        multiProperties: Array<MultiPropertyValue>,

    }
    interface Property {
        id: number,
        type: string,
        visible: true
    }
    interface PropertyValue {
        property: Property,
        value: string
    }
    interface MultiPropertyValue {
        property: Property,
        value: Array<string>
    }
    return (
        <>

            <div className="h-full w-full">

            </div>

        </>
    )
}

export default timeLine;