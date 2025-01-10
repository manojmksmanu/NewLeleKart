import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Button, Modal, Portal, Provider } from "react-native-paper";

const ProductFilters: React.FC<ProductFiltersProps> = ({ fetchProducts }) => {
  const [filters, setFilters] = useState<Filters>({
    size: "",
    storage: "",
    tag: "",
  });

  const [visible, setVisible] = useState<keyof Filters | null>(null);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters({ ...filters, [key]: value });
    setVisible(null); // Close the modal
  };

  const applyFilters = () => {
    fetchProducts(filters);
  };

  return (
    <Provider>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Size */}
        <Text style={styles.label}>Select Size</Text>
        <Button
          mode="outlined"
          onPress={() => setVisible("size")}
          style={styles.button}
        >
          {filters.size || "Select Size"}
        </Button>

        {/* Storage */}
        <Text style={styles.label}>Select Storage</Text>
        <Button
          mode="outlined"
          onPress={() => setVisible("storage")}
          style={styles.button}
        >
          {filters.storage || "Select Storage"}
        </Button>

        {/* Tag */}
        <Text style={styles.label}>Select Tag</Text>
        <Button
          mode="outlined"
          onPress={() => setVisible("tag")}
          style={styles.button}
        >
          {filters.tag || "Select Tag"}
        </Button>

        {/* Apply Filters Button */}
        <Button
          mode="contained"
          onPress={applyFilters}
          style={styles.applyButton}
        >
          Apply Filters
        </Button>
      </ScrollView>

      {/* Modal for Selection */}
      <Portal>
        <Modal
          visible={!!visible}
          onDismiss={() => setVisible(null)}
          contentContainerStyle={styles.modalContent}
        >
          <Text>Select {visible}</Text>
          <Button onPress={() => handleFilterChange(visible!, "Option 1")}>
            Option 1
          </Button>
          <Button onPress={() => handleFilterChange(visible!, "Option 2")}>
            Option 2
          </Button>
        </Modal>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  button: {
    marginBottom: 16,
  },
  applyButton: {
    marginTop: 24,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
});

export default ProductFilters;
