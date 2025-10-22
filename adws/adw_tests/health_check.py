#!/usr/bin/env -S uv run
# /// script
# dependencies = ["python-dotenv", "pydantic>=2.0.0", "requests>=2.31.0"]
# ///

"""
ADW Health Check - Validate ADW system setup

Usage:
  uv run adw_tests/health_check.py
"""

import os
import sys
import subprocess
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


def check_env_vars():
    """Check required environment variables."""
    print("\n🔍 Checking environment variables...")
    required_vars = [
        "ANTHROPIC_API_KEY",
        "GITHUB_REPO_URL",
    ]
    optional_vars = [
        "CLAUDE_CODE_PATH",
        "GITHUB_PAT",
    ]

    missing = []
    for var in required_vars:
        value = os.getenv(var)
        if value:
            # Mask sensitive values
            display_value = value[:10] + "..." if len(value) > 10 else value
            print(f"  ✅ {var}: {display_value}")
        else:
            print(f"  ❌ {var}: NOT SET")
            missing.append(var)

    for var in optional_vars:
        value = os.getenv(var)
        if value:
            print(f"  ℹ️  {var}: {value}")
        else:
            print(f"  ⚠️  {var}: NOT SET (optional)")

    if missing:
        print(f"\n❌ Missing required environment variables: {', '.join(missing)}")
        return False

    print("\n✅ All required environment variables set")
    return True


def check_github_cli():
    """Check GitHub CLI installation and authentication."""
    print("\n🔍 Checking GitHub CLI...")

    # Check if gh is installed
    try:
        result = subprocess.run(
            ["gh", "--version"],
            capture_output=True,
            text=True,
            timeout=5
        )
        if result.returncode == 0:
            version = result.stdout.strip().split('\n')[0]
            print(f"  ✅ GitHub CLI installed: {version}")
        else:
            print("  ❌ GitHub CLI not installed")
            return False
    except FileNotFoundError:
        print("  ❌ GitHub CLI not found")
        print("     Install with: brew install gh")
        return False
    except Exception as e:
        print(f"  ❌ Error checking GitHub CLI: {e}")
        return False

    # Check authentication
    try:
        result = subprocess.run(
            ["gh", "auth", "status"],
            capture_output=True,
            text=True,
            timeout=5
        )
        if result.returncode == 0:
            print("  ✅ GitHub CLI authenticated")
            return True
        else:
            print("  ❌ GitHub CLI not authenticated")
            print("     Run: gh auth login")
            return False
    except Exception as e:
        print(f"  ⚠️  Could not verify authentication: {e}")
        return True  # Don't fail, just warn


def check_claude_cli():
    """Check Claude Code CLI installation."""
    print("\n🔍 Checking Claude Code CLI...")

    claude_path = os.getenv("CLAUDE_CODE_PATH", "claude")

    try:
        result = subprocess.run(
            [claude_path, "--version"],
            capture_output=True,
            text=True,
            timeout=5
        )
        if result.returncode == 0:
            version = result.stdout.strip()
            print(f"  ✅ Claude Code CLI installed: {version}")
            return True
        else:
            print(f"  ❌ Claude Code CLI not working (exit code: {result.returncode})")
            return False
    except FileNotFoundError:
        print(f"  ❌ Claude Code CLI not found at: {claude_path}")
        print("     Install from: https://docs.anthropic.com/en/docs/claude-code")
        return False
    except Exception as e:
        print(f"  ❌ Error checking Claude Code CLI: {e}")
        return False


def check_python_dependencies():
    """Check Python dependencies."""
    print("\n🔍 Checking Python dependencies...")

    try:
        import pydantic
        print(f"  ✅ pydantic: {pydantic.VERSION}")
    except ImportError:
        print("  ❌ pydantic not installed")
        return False

    try:
        import dotenv
        print("  ✅ python-dotenv installed")
    except ImportError:
        print("  ❌ python-dotenv not installed")
        return False

    try:
        import requests
        print(f"  ✅ requests: {requests.__version__}")
    except ImportError:
        print("  ❌ requests not installed")
        return False

    print("\n✅ All Python dependencies installed")
    return True


def check_directory_structure():
    """Check ADW directory structure."""
    print("\n🔍 Checking directory structure...")

    base_dir = Path(__file__).parent.parent.parent
    required_dirs = [
        "adws",
        "adws/adw_modules",
        "adws/adw_triggers",
        "adws/adw_tests",
        "agents",
        "specs",
        ".claude/commands",
    ]

    all_exist = True
    for dir_path in required_dirs:
        full_path = base_dir / dir_path
        if full_path.exists():
            print(f"  ✅ {dir_path}")
        else:
            print(f"  ❌ {dir_path} (missing)")
            all_exist = False

    if all_exist:
        print("\n✅ Directory structure complete")
    else:
        print("\n⚠️  Some directories are missing")

    return all_exist


def check_adw_files():
    """Check ADW core files."""
    print("\n🔍 Checking ADW files...")

    base_dir = Path(__file__).parent.parent
    required_files = [
        "adw_modules/__init__.py",
        "adw_modules/agent.py",
        "adw_modules/data_types.py",
        "adw_modules/github.py",
        "adw_modules/git_ops.py",
        "adw_modules/state.py",
        "adw_modules/utils.py",
        "adw_modules/workflow_ops.py",
        "adw_plan.py",
        "adw_build.py",
        "adw_test.py",
        "adw_plan_build.py",
        "adw_plan_build_test.py",
    ]

    all_exist = True
    for file_path in required_files:
        full_path = base_dir / file_path
        if full_path.exists():
            print(f"  ✅ {file_path}")
        else:
            print(f"  ❌ {file_path} (missing)")
            all_exist = False

    if all_exist:
        print("\n✅ All ADW files present")
    else:
        print("\n⚠️  Some ADW files are missing")

    return all_exist


def main():
    """Run all health checks."""
    print("=" * 60)
    print("ADW Health Check")
    print("=" * 60)

    checks = [
        ("Environment Variables", check_env_vars),
        ("GitHub CLI", check_github_cli),
        ("Claude Code CLI", check_claude_cli),
        ("Python Dependencies", check_python_dependencies),
        ("Directory Structure", check_directory_structure),
        ("ADW Files", check_adw_files),
    ]

    results = []
    for name, check_func in checks:
        try:
            result = check_func()
            results.append((name, result))
        except Exception as e:
            print(f"\n❌ Error running {name} check: {e}")
            results.append((name, False))

    # Summary
    print("\n" + "=" * 60)
    print("Health Check Summary")
    print("=" * 60)

    passed = sum(1 for _, result in results if result)
    total = len(results)

    for name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"  {status}: {name}")

    print(f"\nResults: {passed}/{total} checks passed")

    if passed == total:
        print("\n🎉 ADW system is healthy and ready to use!")
        return 0
    else:
        print(f"\n⚠️  {total - passed} check(s) failed. Please fix the issues above.")
        return 1


if __name__ == "__main__":
    sys.exit(main())
