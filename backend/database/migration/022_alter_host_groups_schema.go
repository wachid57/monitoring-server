//go:build ignore
// +build ignore

package migration

// Deprecated: no-op, build-ignored. We rely on AutoMigrate for initial schema.
func AlterHostGroupsSchema(_ interface{}) error { return nil }
