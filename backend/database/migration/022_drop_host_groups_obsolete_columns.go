//go:build ignore
// +build ignore

package migration

// Deprecated: no-op, build-ignored. Fresh installations rely on AutoMigrate only.
func DropHostGroupsObsoleteColumns(_ interface{}) error { return nil }
