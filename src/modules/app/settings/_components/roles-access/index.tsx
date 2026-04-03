import { Box, Flex, Text } from "@chakra-ui/react";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Button,
  Dialog,
  Header,
  Input,
  Menu,
  MenuItem,
  Switch,
} from "~/modules/shared";
import { TableComponent } from "~/modules/shared/table";
import type { RoleData } from "~/types/base";

const RoleAndAccess = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openRoleDetails, setOpenRoleDetails] = useState<boolean>(false);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const onOpenChange = () => {
    setOpenRoleDetails((prev) => !prev);
  };
  const textProps = {
    color: "#737373",
    fontWeight: 500,
    fontSize: "14px",
  };

  const cellRenderers = {
    roleName: (item: RoleData) => (
      <Text {...textProps} color={"#222222"}>
        {item.roleName}
      </Text>
    ),
    description: (item: RoleData) => (
      <Text {...textProps} color={"#222222"}>
        {item?.description}
      </Text>
    ),

    userCount: (item: RoleData) => (
      <Text {...textProps}>{item?.userCount}</Text>
    ),

    action: () => (
      <Menu>
        <Box>
          <MenuItem
            label="Edit"
            icon={<Pencil size={20} />}
            onClick={() => console.log("Edit")}
            value="edit"
            styleProps={{ color: "#222222" }}
          />
          <MenuItem
            label="Delete"
            icon={<Trash2 size={20} />}
            onClick={() => console.log("Flag")}
            value="delete"
            styleProps={{ color: "#E42222" }}
          />
        </Box>
      </Menu>
    ),
  };

  const columnOrder: (keyof RoleData)[] = [
    "roleName",
    "description",
    "userCount",
    "action",
  ];

  const columnLabels = {
    roleName: "Role Name",
    description: "Description",
    userCount: "User Count",
    action: "",
  };
  const data = [
    {
      roleName: "Administrator",
      description: "Can approve listings and manage users",
      userCount: 3,
    },
    {
      roleName: "Administrator",
      description: "Can approve listings and manage users",
      userCount: 3,
    },
    {
      roleName: "Administrator",
      description: "Can approve listings and manage users",
      userCount: 3,
    },
    {
      roleName: "Administrator",
      description: "Can approve listings and manage users",
      userCount: 3,
    },
  ];

  return (
    <Box mt={10}>
      <Flex justifyContent="space-between" alignItems="center" mb={7}>
        <Header
          title="Role & Permissions"
          description="Manage user roles and their access levels"
        />
        <Button
          rounded="2xl"
          bg="#222222"
          width={"fit-content"}
          handleClick={() => setOpenRoleDetails(true)}
        >
          <Text fontSize="14px" color="#ffffff" ml={2}>
            Add Role +
          </Text>
        </Button>
      </Flex>
      <TableComponent<RoleData>
        tableData={data}
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={Math.ceil(10)}
        cellRenderers={cellRenderers}
        columnOrder={columnOrder}
        columnLabels={columnLabels}
        isLoading={false}
      />
      <Dialog
        open={openRoleDetails}
        onOpenChange={onOpenChange}
        size="lg"
        style={{
          right: 0,
          left: "auto",
          top: 0,
          bottom: 0,
          position: "fixed",
          height: "80vh",

          margin: 0,
          display: "flex",
          alignItems: "stretch",
          justifyContent: "flex-end",
        }}
      >
        <AddRoleAccess />
      </Dialog>
    </Box>
  );
};

export default RoleAndAccess;

const AddRoleAccess = () => {
  return (
    <Box mt={5}>
      <Header title="Add New Role" description="Create a new role" />
      <Box gap={5} display="flex" flexDir={"column"} mt={6}>
        <Input
          type="text"
          name="description"
          handleChange={() => console.log("Holla world!")}
          placeholder="Describe role and responsibility"
          value=""
          label="Description"
        />

        <Switch label="Flag User" header="Permission" />
        <Switch label="Approve Listing" />
        <Switch label="View Reports" />
        <Switch label="Manage Settings" />
      </Box>
      <Flex justifyContent={"end"} gap={3} mt={8}>
        <Button bg="#F6F6F6" width={"fit-content"}>
          <Text color="#737373">Cancel</Text>
        </Button>
        <Button bg="#222222" width={"fit-content"}>
          <Text color="#fff">Add Role</Text>
        </Button>
      </Flex>
    </Box>
  );
};
