import React, { useContext, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi"; 
import { Context } from '../../../store/context';
import ConfirmDeleteUser from '../modals/ConfirmDeleteUser'; // Importar el modal

const UserDetailsCard = ({
  user,
  onEditClick,
  isEditing,
  editedUserData,
  setEditedUserData,
  onSaveClick, 
  onCancelClick,
  setEditingRut
}) => {
  const { store, actions } = useContext(Context);

  // Estado para controlar la visibilidad del modal de confirmación
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!store.cafes.length) {
      actions.fetchCafes();
    }
  }, [store.cafes.length]);

  // Función para manejar la confirmación de eliminación
  const handleConfirmDelete = async (adminPassword) => {
    const result = await actions.deleteUser(user.rut, adminPassword);
    if (result.success) {
      setShowDeleteModal(false);
    } else {
      alert(`Error: ${result.message}`);
    }
  };

  return (
    <div className="user-card border p-3">
      <div className="user-card-header d-flex justify-content-between align-items-center mb-3">
        {isEditing ? (
          <input
            type="text"
            className="form-control"
            value={editedUserData.first_name || ""}
            onChange={(e) =>
              setEditedUserData({ ...editedUserData, first_name: e.target.value })
            }
          />
        ) : (
          <h5 className="mb-0">
            {user.first_name} {user.last_name_father} {user.last_name_mother}
          </h5>
        )}

        {isEditing ? (
          <>
            <button 
              className="btn btn-sm btn-success me-2" 
              onClick={onSaveClick}>
              Guardar
            </button>
            <button 
              className="btn btn-sm btn-secondary" 
              onClick={onCancelClick}>
              Cancelar
            </button>
          </>
        ) : (
          <div>
            <button className="btn btn-sm btn-primary me-2" onClick={onEditClick}>
              <FiEdit size={16} /> 
            </button>
            {/* Botón para eliminar al usuario, sólo para admins */}
            {store.admin && (
              <button 
                className="btn btn-sm btn-danger"
                onClick={() => setShowDeleteModal(true)}
              >
                Eliminar
              </button>
            )}
          </div>
        )}
      </div>

      <div className="user-card-body">
        {isEditing ? (
          <>
            <div className="form-group mb-2">
              <label>Apellido Paterno:</label>
              <input
                type="text"
                className="form-control"
                value={editedUserData.last_name_father || ""}
                onChange={(e) =>
                  setEditedUserData({ ...editedUserData, last_name_father: e.target.value })
                }
              />
            </div>

            <div className="form-group mb-2">
              <label>Apellido Materno:</label>
              <input
                type="text"
                className="form-control"
                value={editedUserData.last_name_mother || ""}
                onChange={(e) =>
                  setEditedUserData({ ...editedUserData, last_name_mother: e.target.value })
                }
              />
            </div>

            <div className="form-group mb-2">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                value={editedUserData.username || ""}
                onChange={(e) =>
                  setEditedUserData({ ...editedUserData, username: e.target.value })
                }
              />
            </div>

            <div className="form-group mb-2">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={editedUserData.email || ""}
                onChange={(e) =>
                  setEditedUserData({ ...editedUserData, email: e.target.value })
                }
              />
            </div>

            <div className="form-group mb-2">
              <label>Rol:</label>
              <select
                className="form-control"
                value={editedUserData.role_id || ""}
                onChange={(e) =>
                  setEditedUserData({ ...editedUserData, role_id: e.target.value })
                }
              >
                <option value="">Seleccionar Rol</option>
                <option value="1">Administrador</option>
                <option value="2">Gerente</option>
                <option value="3">Vendedor</option>
              </select>
            </div>

            <div className="form-group mb-2">
              <label><strong>Cafetería:</strong></label>
              <select
                name="cafe_id"
                value={editedUserData.cafe_id || ""}
                onChange={(e) =>
                  setEditedUserData({ ...editedUserData, cafe_id: e.target.value })
                }
                className="form-control"
              >
                <option value="">Seleccione una Cafetería</option>
                {Array.isArray(store.cafes) && store.cafes.length > 0 ? (
                  store.cafes.map((cafe) => (
                    <option key={cafe.id} value={cafe.id}>{cafe.name}</option>
                  ))
                ) : (
                  <option disabled>Cargando cafeterías...</option>
                )}
              </select>
            </div>
          </>
        ) : (
          <>
            <p><strong>RUT:</strong> {user.rut}</p>
            <p><strong>Nombre de Usuario:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Rol:</strong> {user.role_name}</p>
            <p><strong>Cafetería:</strong> {user.cafe_name}</p>
          </>
        )}
      </div>

      {/* Modal de Confirmación de Eliminación de Usuario */}
      {showDeleteModal && (
        <ConfirmDeleteUser
          user={user}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default UserDetailsCard;
