describe('Records and Bands', () => {
    
    before('Visit the website specified in Cypress config', () => {
        cy.visit(Cypress.env('url'));
    })

    it('Validate the records are listed and sorted alphabetically', () => {
        let unsortedRecords = [];

        //Fetch the value of record names from the UI
        cy.get('ol > li').then((list) => {
            for (const [key, value] of Object.entries(list)) {
                if(value.innerHTML) {
                    const innerString = value.innerHTML;
                    const index = innerString?.indexOf('<ul><li>')
                    const recordName = innerString.substring(0, index);
                    //Push all records to the array unsorted records
                    unsortedRecords.push(recordName)
                }                             
            }

            let sortedRecords = [];
            // Custom Cypress assertion defined in commands.js to validate records list is sorted alphabetically
            cy.compareArrays(sortedRecords, unsortedRecords);
        })
    })

    it('Validate Band names are listed under the Records and are sorted alphabetically', () => {
        
        cy.get('ol > li').then((list) => {
            for (const [key, value] of Object.entries(list)) {
                let bandNames = [];
                if(value.childElementCount > 0) {
                    let arry = [...value.children]

                    arry.forEach(ele => {
                        //Push all Bands to the array bandNames
                        bandNames.push(ele.outerText);
                    })
                }
                // Validate the Band Names are sorted alphabetically
                let sortedBands = [];
                cy.compareArrays(sortedBands, bandNames);                 
            }
        })
    })

})