import Swal from 'sweetalert2'

export const DeleteRecord = (id, DeleteRecordApi, showNotification, setStatusUpdate) => (
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "var(--cui-primary)",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            const response = await DeleteRecordApi(id)
            if (response.status === 200) {
                // aa update thse but je status hse a j rese etle listing useEffect ma ny aave to render vadhare network ma ny thay
                setStatusUpdate(prev => !prev);
                showNotification({
                    title: "Success",
                    message: response?.data?.message,
                    status: 'success',
                    isOpen: true
                });
            }

        }
    })
)
