import { motion, AnimateSharedLayout } from "framer-motion";
import Organisation from "./navlinks/Organisation";
import Handbooks from "./navlinks/Handbooks";
import ClientRegister from "./navlinks/ClientRegister";
import Suppliers from "./navlinks/Suppliers";
import Equipment from "./navlinks/Equipment";
import PDF from "./navlinks/PDF";
import Links from "./navlinks/Links";

const Nav = (props) => {
  return (
    <nav className="text-white">
      <AnimateSharedLayout>
        <motion.ul layout className="pr-2 pt-14">
          <Organisation
            layout
            sidebarIsOpen={props.sidebarIsOpen}
            toggleSidebarHandler={props.toggleSidebarHandler}
          />
          <Handbooks
            layout
            sidebarIsOpen={props.sidebarIsOpen}
            toggleSidebarHandler={props.toggleSidebarHandler}
          />
          <ClientRegister
            layout
            sidebarIsOpen={props.sidebarIsOpen}
            toggleSidebarHandler={props.toggleSidebarHandler}
          />
          <Suppliers
            layout
            sidebarIsOpen={props.sidebarIsOpen}
            toggleSidebarHandler={props.toggleSidebarHandler}
          />
          <Equipment
            layout
            sidebarIsOpen={props.sidebarIsOpen}
            toggleSidebarHandler={props.toggleSidebarHandler}
          />
          <PDF
            layout
            sidebarIsOpen={props.sidebarIsOpen}
            toggleSidebarHandler={props.toggleSidebarHandler}
          />
          <Links
            layout
            sidebarIsOpen={props.sidebarIsOpen}
            toggleSidebarHandler={props.toggleSidebarHandler}
          />
        </motion.ul>
      </AnimateSharedLayout>
    </nav>
  );
};

export default Nav;
