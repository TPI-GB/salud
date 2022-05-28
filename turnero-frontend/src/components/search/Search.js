export default function Search() {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <FormControl sx={{ width: 250 }} style={{ margin: 12 }}>
          <InputLabel id="feature-multiple-checkbox-label"></InputLabel>
          <InputLabel id="Categoria-label">Medico</InputLabel>
          <Select
            {...register("category")}
            labelId="Categoria-label"
            label="Categoria"
          >
            <MenuItem value={"Todas"}>Todas</MenuItem>
            {categories.map(({ name, icon }) => (
              <MenuItem value={name}>
                {`${name}`}
                {<FontAwesomeIcon icon={icon} />}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 250 }} style={{ margin: 12 }}>
          <InputLabel id="feature-multiple-checkbox-label">
            Caracteristicas
          </InputLabel>
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          style={{ background: "#39A2DB", margin: 15 }}
        >
          <SearchIcon />
        </Button>
      </div>
    </form>
  );
}
