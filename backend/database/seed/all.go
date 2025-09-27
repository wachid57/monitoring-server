package seed

// SeedAll runs all seed routines; log handling is left to caller.
func SeedAll() error {
    if err := SystemSettings(); err != nil { return err }
    if err := UserSettings(); err != nil { return err }
    return nil
}
