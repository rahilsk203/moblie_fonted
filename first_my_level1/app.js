   <td data-label="ID">${accessory.id}</td>
            <td data-label="Name">${accessory.name}</td>
            <td data-label="Company">${accessory.company}</td>
            <td data-label="Model">${accessory.model}</td>
            <td data-label="Repairing cost">${accessory.repairing_cost}</td>
            <td data-label="Selling cost">${accessory.selling_cost}</td>
            <td data-label="Current stock">${accessory.current_stock}</td>
            <td data-label="Minimum stock">${accessory.minimum_stock}</td>
            <td data-label="Total stock">${accessory.total_out_stock}</td>
            <td data-label="Last purchase quantity">${accessory.last_purchase_quantity}</td>
            <td data-label="Last repairing quantity">${accessory.last_repairing_quantity}</td>
            <td data-label="Last purchase date">${accessory.last_purchase_date || 'N/A'}</td>
            <td data-label="Last repairing date">${accessory.last_repairing_date || 'N/A'}</td>
            <td data-label="Action">${accessory.alert ? 'Yes' : 'No'}</td>
            <td>
               <div class="dropdown">
                    <button class="btn btn-more" data-id="${accessory.id}">
                        <i class="ri-more-2-fill"></i>
                    </button>
                    <div id="menu-${accessory.id}" class="dropdown-menu">
                        <button class="btn btn-edit" onclick='openPopup3(${accessory.id})'>Edit</button>
                        <button class="btn btn-delete" onclick="deleteAccessory(${accessory.id})">Delete</button>
                        <button class="btn btn-export" onclick="accessoriesDataExportpdfId(${accessory.id})">Export</button>
                    </div>
                </div>
            </td>
            
            
 